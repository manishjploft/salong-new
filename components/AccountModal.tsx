import Link from "next/link";
import React from "react";

const AccountModal = () => {
  return (
    <div className="w-full h-full flex flex-col bg-white shadow-md px-2 rounded-md border-none">
      <Link href="/logg-inn" className="w-full py-2 px-4">
        <p>Logg&nbsp;inn</p>
      </Link>
      <Link
        href="/bli-forhandler"
        className="w-full py-2 px-4 border-t border-primary"
      >
        <p>Bli&nbsp;forhandler</p>
      </Link>
    </div>
  );
};

export default AccountModal;
