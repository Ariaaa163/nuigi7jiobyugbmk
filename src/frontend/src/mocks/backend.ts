import type { backendInterface } from "../backend";

export const mockBackend: backendInterface = {
  getRegistrations: async () => [
    {
      id: BigInt(1),
      name: "Aryan Sharma",
      email: "aryan@adypu.edu.in",
      phone: "9876543210",
      interests: "Technology & Innovation",
      message: "Excited to be part of this amazing community!",
      submittedAt: BigInt(Date.now()),
    },
    {
      id: BigInt(2),
      name: "Priya Verma",
      email: "priya@adypu.edu.in",
      phone: "9876543211",
      interests: "Design & Creativity",
      message: "Looking forward to collaborating with like-minded peers.",
      submittedAt: BigInt(Date.now()),
    },
  ],
  submitRegistration: async (_input) => ({
    __kind__: "ok",
    ok: BigInt(3),
  }),
};
