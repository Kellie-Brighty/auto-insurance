import Image from "next/image";
import React from "react";

interface DashboardStatisticsInterface {
  title?: string;
  firstBoxImageUrl: string;
  firstBoxTitle: string;
  firstBoxPrice: number;
  secondBoxImageUrl: string;
  secondBoxTitle: string;
  secondBoxPrice: number;
  thirdBoxImageUrl: string;
  thirdBoxTitle: string;
  thirdBoxPrice: number;
  fourthBoxImageUrl: string;
  fourthBoxTitle: string;
  fourthBoxPrice: number;
}

const DashboardStatistics = ({
  title,
  firstBoxImageUrl,
  firstBoxTitle,
  firstBoxPrice,
  secondBoxImageUrl,
  secondBoxTitle,
  secondBoxPrice,
  thirdBoxImageUrl,
  thirdBoxTitle,
  thirdBoxPrice,
  fourthBoxImageUrl,
  fourthBoxTitle,
  fourthBoxPrice,
}: DashboardStatisticsInterface) => {
  return (
    <div>
      <p className={`text-[18px] font-medium`}>{title}</p>

      <div
        className={`mt-[15px] items-center flex bg-white py-[20px] px-[24px] justify-between`}
      >
        <div className={``}>
          <div className={`flex w-[200px] justify-between`}>
            <Image
              src={firstBoxImageUrl}
              alt="active-policies"
              width={48}
              height={48}
            />
            <Image
              src={"/assets/admin/arrows-diagonal.svg"}
              alt="active-policies"
              width={16}
              height={16}
            />
          </div>
          <p
            className={`mt-[16px] text-[#64748B] text-[14px]
            font-bold font-inter`}
          >
            {firstBoxTitle}
          </p>
          <div className={`flex items-center space-x-5 mt-[16px]`}>
            <p className={`font-grotesque font-extrabold text-[24px]`}>
              {firstBoxPrice}
            </p>
            <div
              className={`flex items-center bg-[#24d16327] p-[2px] rounded-md px-[5px] mt-[3px]`}
            >
              <Image
                src={"/assets/admin/green-up.png"}
                alt="green-up"
                width={16}
                height={16}
              />
              <p className={`text-[12px] font-medium text-[#24D164]`}>59%</p>
            </div>
          </div>
        </div>
        <div className={`h-[72px] w-[1px] bg-[#E2E8F0]`} />
        <div className={``}>
          <div className={`flex w-[200px] justify-between`}>
            <Image
              src={secondBoxImageUrl}
              alt="active-policies"
              width={48}
              height={48}
            />
            <Image
              src={"/assets/admin/arrows-diagonal.svg"}
              alt="active-policies"
              width={16}
              height={16}
            />
          </div>
          <p
            className={`mt-[16px] text-[#64748B] text-[14px]
            font-bold font-inter`}
          >
            {secondBoxTitle}
          </p>
          <div className={`flex items-center space-x-5 mt-[16px]`}>
            <p className={`font-grotesque font-extrabold text-[24px]`}>
              {secondBoxPrice}
            </p>
            <div
              className={`flex items-center bg-[#ed1c2336] p-[2px] rounded-md px-[5px] mt-[3px]`}
            >
              <Image
                src={"/assets/admin/red-down.png"}
                alt="green-up"
                width={16}
                height={16}
              />
              <p className={`text-[12px] font-medium text-[#ED1C24]`}>59%</p>
            </div>
          </div>
        </div>
        <div className={`h-[72px] w-[1px] bg-[#E2E8F0]`} />
        <div className={``}>
          <div className={`flex w-[200px] justify-between`}>
            <Image
              src={thirdBoxImageUrl}
              alt="active-policies"
              width={48}
              height={48}
            />
            <Image
              src={"/assets/admin/arrows-diagonal.svg"}
              alt="active-policies"
              width={16}
              height={16}
            />
          </div>
          <p
            className={`mt-[16px] text-[#64748B] text-[14px]
            font-bold font-inter`}
          >
            {thirdBoxTitle}
          </p>
          <div className={`flex items-center space-x-5 mt-[16px]`}>
            <p className={`font-grotesque font-extrabold text-[24px]`}>
              {thirdBoxPrice}
            </p>
            <div
              className={`flex items-center bg-[#ed1c2330] p-[2px] rounded-md px-[5px] mt-[3px]`}
            >
              <Image
                src={"/assets/admin/red-down.png"}
                alt="green-up"
                width={16}
                height={16}
              />
              <p className={`text-[12px] font-medium text-[#ED1C24]`}>59%</p>
            </div>
          </div>
        </div>
        <div className={`h-[72px] w-[1px] bg-[#E2E8F0]`} />
        <div className={``}>
          <div className={`flex w-[200px] justify-between`}>
            <Image
              src={fourthBoxImageUrl}
              alt="active-policies"
              width={48}
              height={48}
            />
            <Image
              src={"/assets/admin/arrows-diagonal.svg"}
              alt="active-policies"
              width={16}
              height={16}
            />
          </div>
          <p
            className={`mt-[16px] text-[#64748B] text-[14px]
            font-bold font-inter`}
          >
            {fourthBoxTitle}
          </p>
          <div className={`flex items-center space-x-5 mt-[16px]`}>
            <p className={`font-grotesque font-extrabold text-[24px]`}>
              {fourthBoxPrice}
            </p>
            <div
              className={`flex items-center bg-[#ed1c232b] p-[2px] rounded-md px-[5px] mt-[3px]`}
            >
              <Image
                src={"/assets/admin/red-down.png"}
                alt="green-up"
                width={16}
                height={16}
              />
              <p className={`text-[12px] font-medium text-[#ED1C24]`}>59%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatistics;
