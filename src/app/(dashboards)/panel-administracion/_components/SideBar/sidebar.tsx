"use client";

import Link from "next/link";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlarmSmoke,
  Anvil,
  BedSingle,
  Eye,
  HandPlatter,
  Home,
  Hotel,
  Plus,
  User,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./sidebar.module.css";

const SideBar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside
      className={`sticky pt-6 pb-8 top-0 bottom-0 z-[60] overflow-y-scroll flex flex-col flex-none gap-3 w-64 max-h-screen min-h-screen ${styles.sidebar}`}
    >
      <div className="pb-3 flex flex-col gap-3 items-center justify-center text-sm">
        <div
          className={` font-medium select-none rounded-full ${
            session?.user.image ? "" : "border border-zinc-400"
          } h-16 w-16 flex flex-col items-center justify-center`}
        >
          {session ? (
            <>
              {session.user.image ? (
                <>
                  <Image
                    className="w-full h-full rounded-full"
                    src={session.user.image}
                    width={100}
                    height={100}
                    alt="Foto de perfil"
                  />
                </>
              ) : (
                <>
                  <p className="text-xl">
                    {session.user?.name && session.user?.name[0]}
                  </p>
                </>
              )}
            </>
          ) : (
            <>
              <User className="w-8 h-8" strokeWidth={1} />
            </>
          )}
        </div>
        <p className="text-sm">Hola, {session?.user.name}</p>
      </div>

      <nav className="w-full">
        <ul className="w-full">
          <li className="w-full">
            <Link
              href={`/panel-administracion`}
              className={`flex gap-3 items-center text-gold-hr hover:bg-zinc-900 w-full h-11 px-3 text-sm font-semibold ${
                pathname === "/panel-administracion" ? "bg-zinc-900" : ""
              }`}
            >
              <Home className="w-4 h-4" strokeWidth={1.5} />
              <p>Principal</p>
            </Link>
          </li>
          <Accordion type="single" collapsible className="w-full">
            <li>
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-900 w-full px-3 h-11">
                  <div className="flex gap-3 items-center">
                    <Hotel className="w-4 h-4" strokeWidth={1.5} />
                    <p>Sedes</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-0">
                  <ul>
                    <li>
                      <Link
                        href={`/panel-administracion/sedes/all`}
                        className={`flex gap-2 items-center px-10 h-11 hover:bg-zinc-900 ${
                          pathname === "/panel-administracion/sedes/all"
                            ? "bg-zinc-900"
                            : ""
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                        <p className="text-sm">Ver Todas</p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/panel-administracion/sedes/new`}
                        className={`flex gap-2.5 items-center px-10 h-11 hover:bg-zinc-900 ${
                          pathname === "/panel-administracion/sedes/new"
                            ? "bg-zinc-900"
                            : ""
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                        <p className="text-sm">Crear</p>
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </li>
            <li className="w-full">
              <AccordionItem value="item-2" className="border-none">
                <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-900 w-full px-3 h-11">
                  <div className="flex gap-3 items-center">
                    <BedSingle className="w-4 h-4" strokeWidth={1.5} />
                    <p>Habitaciones</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-0">
                  <ul>
                    <li>
                      <Link
                        href={`/panel-administracion/habitaciones/all`}
                        className={`flex gap-2 items-center px-10 h-11 hover:bg-zinc-900 ${
                          pathname === "/panel-administracion/habitaciones/all"
                            ? "bg-zinc-900"
                            : ""
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                        <p className="text-sm">Ver Todas</p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/panel-administracion/habitaciones/new`}
                        className={`flex gap-2.5 items-center px-10 h-11 hover:bg-zinc-900 ${
                          pathname === "/panel-administracion/habitaciones/new"
                            ? "bg-zinc-900"
                            : ""
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                        <p className="text-sm">Crear</p>
                      </Link>
                    </li>
                    <li>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item01" className="border-none">
                          <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-900 w-full pl-10 pr-3 h-11">
                            <div className="flex gap-3 items-center">
                              <Anvil
                                strokeWidth={1.5}
                                className="w-3.5 h-3.5"
                              />
                              Tipos de Habitación
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="py-0">
                            <ul>
                              <li>
                                <Link
                                  href={`/panel-administracion/habitaciones/categorias`}
                                  className={`flex gap-2 items-center pl-[66px] h-11 hover:bg-zinc-900 ${
                                    pathname ===
                                    "/panel-administracion/habitaciones/categorias"
                                      ? "bg-zinc-900"
                                      : ""
                                  }`}
                                >
                                  <Eye
                                    className="w-3.5 h-3.5"
                                    strokeWidth={2}
                                  />
                                  <p className="text-sm">Ver Todas</p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href={`/panel-administracion/habitaciones/categorias/new`}
                                  className={`flex gap-2.5 items-center pl-[66px] h-11 hover:bg-zinc-900 ${
                                    pathname ===
                                    "/panel-administracion/habitaciones/categorias/new"
                                      ? "bg-zinc-900"
                                      : ""
                                  }`}
                                >
                                  <Plus
                                    className="w-3.5 h-3.5"
                                    strokeWidth={3}
                                  />
                                  <p className="text-sm">Crear</p>
                                </Link>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item02" className="border-none">
                          <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-900 w-full pl-10 pr-3 h-11">
                            <div className="flex gap-3 items-center">
                              <AlarmSmoke
                                strokeWidth={1.5}
                                className="w-3.5 h-3.5"
                              />
                              Comodidades
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="py-0">
                            <ul>
                              <li>
                                <Link
                                  href={`/panel-administracion/habitaciones/comodidades`}
                                  className={`flex gap-2 items-center pl-[66px] h-11 hover:bg-zinc-900 ${
                                    pathname ===
                                    "/panel-administracion/habitaciones/comodidades"
                                      ? "bg-zinc-900"
                                      : ""
                                  }`}
                                >
                                  <Eye
                                    className="w-3.5 h-3.5"
                                    strokeWidth={2}
                                  />
                                  <p className="text-sm">Ver Todas</p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href={`/panel-administracion/habitaciones/comodidades/new`}
                                  className={`flex gap-2.5 items-center pl-[66px] h-11 hover:bg-zinc-900 ${
                                    pathname ===
                                    "/panel-administracion/habitaciones/comodidades/new"
                                      ? "bg-zinc-900"
                                      : ""
                                  }`}
                                >
                                  <Plus
                                    className="w-3.5 h-3.5"
                                    strokeWidth={3}
                                  />
                                  <p className="text-sm">Crear</p>
                                </Link>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item03" className="border-none">
                          <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-900 w-full pl-10 pr-3 h-11">
                            <div className="flex gap-3 items-center">
                              <HandPlatter
                                strokeWidth={1.5}
                                className="w-3.5 h-3.5"
                              />
                              Servicios
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="py-0">
                            <ul>
                              <li>
                                <Link
                                  href={`/panel-administracion/habitaciones/servicios/all`}
                                  className={`flex gap-2 items-center pl-[66px] h-11 hover:bg-zinc-900 ${
                                    pathname ===
                                    "/panel-administracion/habitaciones/servicios/all"
                                      ? "bg-zinc-900"
                                      : ""
                                  }`}
                                >
                                  <Eye
                                    className="w-3.5 h-3.5"
                                    strokeWidth={2}
                                  />
                                  <p className="text-sm">Ver Todos</p>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href={`/panel-administracion/habitaciones/servicios/new`}
                                  className={`flex gap-2.5 items-center pl-[66px] h-11 hover:bg-zinc-900 ${
                                    pathname ===
                                    "/panel-administracion/habitaciones/servicios/new"
                                      ? "bg-zinc-900"
                                      : ""
                                  }`}
                                >
                                  <Plus
                                    className="w-3.5 h-3.5"
                                    strokeWidth={3}
                                  />
                                  <p className="text-sm">Crear</p>
                                </Link>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </li>
            <li className="w-full">
              <AccordionItem value="item-3" className="border-none">
                <AccordionTrigger className="font-normal text-sm hover:no-underline hover:bg-zinc-900 w-full px-3 h-11">
                  <div className="flex gap-3 items-center">
                    <Users className="w-4 h-4" strokeWidth={1.5} />
                    <p>Usuarios</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-0">
                  <ul>
                    <li>
                      <Link
                        href={`/panel-administracion/users/all`}
                        className={`flex gap-2 items-center px-10 h-11 hover:bg-zinc-900 ${
                          pathname === "/panel-administracion/users/all"
                            ? "bg-zinc-900"
                            : ""
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" strokeWidth={2} />
                        <p className="text-sm">Ver Todos</p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/panel-administracion/users/new`}
                        className={`flex gap-2.5 items-center px-10 h-11 hover:bg-zinc-900 ${
                          pathname === "/panel-administracion/users/new"
                            ? "bg-zinc-900"
                            : ""
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                        <p className="text-sm">Crear</p>
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </li>
          </Accordion>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
