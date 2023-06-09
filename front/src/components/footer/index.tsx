import Image from "next/image";
import Link from "next/link";
import motors_white_logo from "../../assets/motors_shop_white_logo.svg";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-5">
      <figure>
        <Image
          src={motors_white_logo}
          alt="motors shop white logo"
          width={150}
        />
      </figure>
      <p className="text-sm">© 2022 - Todos os direitos reservados.</p>
      <Link href="/dashboard"> Go up</Link>
    </footer>
  );
}
