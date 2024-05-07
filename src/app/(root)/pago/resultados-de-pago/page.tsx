"use client";

import { PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = ({ searchParams }: { searchParams: { "kr-answer": string } }) => {
  const router = useRouter();
  console.log(JSON.parse(searchParams["kr-answer"]));
  const answer = JSON.parse(searchParams["kr-answer"]);
  const [countdown, setCountdown] = useState(20);
  const countdownInterval = useRef<any>(null);

  const updateCountdown = () => {
    setCountdown((prev) => prev - 1);
  };

  useEffect(() => {
    if (!countdownInterval.current) {
      countdownInterval.current = setInterval(updateCountdown, 1000);
    }
    if (countdown <= 0) {
      clearInterval(countdownInterval.current);
      router.push("/");
      router.refresh();
    }
  }, [countdown]);

  return (
    <main>
      <section className="py-20 px-6 flex items-center justify-center">
        <div className="w-full max-w-[500px] flex items-center justify-center flex-col text-center gap-4">
          <div>
            <PartyPopper
              className="w-12 h-12 text-gold-hr-dark"
              strokeWidth={1}
            />
          </div>
          <h2 className="text-2xl font-medium">
            {answer.orderStatus === "PAID"
              ? "Tu reserva se creó con éxito"
              : "Parece que algo salió mal durante el pago"}
          </h2>

          <p>
            {answer.orderStatus === "PAID"
              ? "Gracias por reservar con nosotros, puedes ver los detalles de la reserva en tu perfil, en la sección de reservas"
              : "Vuelve a realizar el pago o verifica si tienes los fondos suficientes"}
          </p>

          <p>Redirigiendo a la página de Inicio... {countdown}</p>
        </div>
      </section>
    </main>
  );
};

export default Page;
