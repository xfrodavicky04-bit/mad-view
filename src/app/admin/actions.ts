"use server";

import { prisma } from "@/lib/db";
import { createSession, deleteSession } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter both email and password." };
  }

  let success = false;

  try {
    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return { error: "Invalid email or password." };
    }

    const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordMatch) {
      return { error: "Invalid email or password." };
    }

    await createSession(admin.id);
    success = true;
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred." };
  }

  if (success) {
    redirect("/admin");
  }
}

export async function logoutAction() {
  await deleteSession();
  redirect("/admin/login");
}
