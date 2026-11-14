import { NextResponse } from "next/server";
import { ProductInputError, parseProductForm, resolveBrandId, uniqueSlug, uploadedImageUrl } from "@/lib/admin-products";
import { AuthzError, requireAdminUser } from "@/lib/authz";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    await requireAdminUser();
    const input = await parseProductForm(await req.formData());

    const product = await prisma.product.create({
      data: {
        name: input.name,
        slug: await uniqueSlug(input.name),
        description: input.description || null,
        priceAmd: input.priceAmd,
        animalType: input.animalType,
        category: input.category,
        inStock: input.inStock,
        brandId: await resolveBrandId(input.brand),
        imageUrl: input.image ? "" : (input.imageUrl ?? ""),
      },
    });

    if (input.image) {
      await prisma.$transaction([
        prisma.productImage.create({
          data: { productId: product.id, mimeType: input.image.mimeType, data: input.image.data },
        }),
        prisma.product.update({ where: { id: product.id }, data: { imageUrl: uploadedImageUrl(product.id) } }),
      ]);
    }

    return NextResponse.json({ ok: true, id: product.id }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthzError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: error.status });
    }
    if (error instanceof ProductInputError) {
      return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
    }
    console.error("[admin products] create failed", error);
    return NextResponse.json({ ok: false, message: "Could not save the product." }, { status: 500 });
  }
}
