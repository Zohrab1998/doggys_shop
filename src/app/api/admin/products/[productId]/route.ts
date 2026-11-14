import { NextResponse } from "next/server";
import { ProductInputError, parseProductForm, resolveBrandId, uniqueSlug, uploadedImageUrl } from "@/lib/admin-products";
import { AuthzError, requireAdminUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

type Context = { params: Promise<{ productId: string }> };

function errorResponse(error: unknown, fallback: string) {
  if (error instanceof AuthzError) {
    return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
  }
  if (error instanceof ProductInputError) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
  }
  console.error("[admin products]", fallback, error);
  return NextResponse.json({ ok: false, message: fallback }, { status: 500 });
}

export async function PATCH(req: Request, { params }: Context) {
  try {
    await requireAdminUser();
    const { productId } = await params;

    const existing = await prisma.product.findUnique({ where: { id: productId } });
    if (!existing) {
      return NextResponse.json({ ok: false, message: "Product not found." }, { status: 404 });
    }

    const input = await parseProductForm(await req.formData());
    const hadUpload = existing.imageUrl.startsWith("/api/product-image/");

    // Photo priority: a newly uploaded file, then "remove photo", then the link field. If the
    // product already has an uploaded photo and nothing changed, keep it.
    let imageUrl = existing.imageUrl;
    if (input.image) {
      imageUrl = uploadedImageUrl(productId);
    } else if (input.removeImage) {
      imageUrl = "";
    } else if (input.imageUrl) {
      imageUrl = input.imageUrl;
    } else if (!hadUpload) {
      imageUrl = "";
    }
    const keepUpload = imageUrl.startsWith("/api/product-image/");

    const slug = input.name === existing.name ? existing.slug : await uniqueSlug(input.name, productId);
    const brandId = await resolveBrandId(input.brand);
    const image = input.image;

    await prisma.$transaction(async (tx) => {
      if (image) {
        await tx.productImage.upsert({
          where: { productId },
          create: { productId, mimeType: image.mimeType, data: image.data },
          update: { mimeType: image.mimeType, data: image.data },
        });
      } else if (!keepUpload) {
        await tx.productImage.deleteMany({ where: { productId } });
      }

      await tx.product.update({
        where: { id: productId },
        data: {
          name: input.name,
          // The link to the product page only changes when the name does.
          slug,
          description: input.description || null,
          priceAmd: input.priceAmd,
          animalType: input.animalType,
          category: input.category,
          inStock: input.inStock,
          brandId,
          imageUrl,
        },
      });
    });

    return NextResponse.json({ ok: true, id: productId });
  } catch (error) {
    return errorResponse(error, "Could not save the product.");
  }
}

export async function DELETE(_req: Request, { params }: Context) {
  try {
    await requireAdminUser();
    const { productId } = await params;

    const existing = await prisma.product.findUnique({ where: { id: productId }, select: { id: true } });
    if (!existing) {
      return NextResponse.json({ ok: false, message: "Product not found." }, { status: 404 });
    }

    // Past orders keep their own copy of the name and price, so they are not affected.
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return errorResponse(error, "Could not delete the product.");
  }
}
