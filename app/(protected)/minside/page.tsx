import ChangePassword from "@/components/mypage/ChangePassword";
import LogoutButton from "@/components/mypage/LogoutButton";
import ProfilePage from "@/components/mypage/ProfilePage";
import ProfileLinks from "@/components/mypage/Sidebar";
import { fetchUserDetails } from "@/features/customer/customer.action";
import React from "react";

const MyPage = async () => {
  const userDetail = await fetchUserDetails();
  const activeLink = "/minside";
  return (
    <>
      <section className="py-8 w-full bg-background">
        <div className="container2 px-4 mx-auto">
          <div className="w-full profileTopSection">
            <h3 className="text-2xl lg:text-3xl font-light text-black mb-4">
              Min side
            </h3>
            <LogoutButton />
          </div>
          <div className="flex flex-col lg:flex-row -mx-3">
            <div className="w-full lg:w-1/3 px-3 mb-4 lg:mb-0">
              <div className="mb-4">
                <ProfileLinks activeLink={activeLink} />
              </div>
            </div>
            <section className=" w-full lg:w-2/3 px-4">
              <div className="max-w-5xl p-4 lg:p-8 bg-white rounded-xl mx-auto">
                <ProfilePage userDetail={userDetail} />
                <ChangePassword user={userDetail} />
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyPage;
