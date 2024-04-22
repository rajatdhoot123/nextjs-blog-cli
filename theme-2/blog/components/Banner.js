"use client";

import Link from "next/link";
import { useRef } from "react";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";
import { markdownify } from "../utils/textConverter";

const Banner = ({ title }) => {
  const banner = useRef(null);

  return (
    <div className="banner banner-single " ref={banner}>
      <div className="container-xl">
        <div className="banner-wrapper relative text-center">
          <div className="relative z-10">
            {markdownify(title, "h1", "mb-8 banner-regular-title")}
            <ul className="breadcrumb flex items-center justify-center">
              <li>
                <Link className="text-primary" href="/">
                  Home
                </Link>
              </li>
              <li className="mx-2">/</li>
              <li className="capitalize">{title}</li>
            </ul>
          </div>
          <div
            style={{
              backgroundColor: "rgb(255 250 243)",
            }}
            className="h-full w-full absolute col-12  top-0 left-0"
          >
            <ImageFallback
              priority={true}
              fill={true}
              src="/blog/images/vectors/single-banner-wave-1.svg"
              sizes="100vw"
              alt=""
            />
            <ImageFallback
              priority={true}
              fill={true}
              src="/blog/images/vectors/single-banner-wave-2.svg"
              sizes="100vw"
              alt=""
            />
            <Circle
              className="circle left-[15%] top-[18%]"
              width={32}
              height={32}
              fill={false}
            />
            <Circle
              className="circle left-[4%] bottom-[27%]"
              width={73}
              height={73}
            />
            <Circle
              className="circle left-[39.5%] bottom-[27%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle left-[22%] bottom-[24%]"
              width={47}
              height={47}
              fill={false}
            />
            <Circle
              className="circle left-[31%] top-[10%]"
              width={62}
              height={62}
              fill={false}
            />
            <Circle
              className="circle right-[27%] top-[15%]"
              width={20}
              height={20}
              fill={false}
            />
            <Circle
              className="circle right-[3%] bottom-[17%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="circle right-[38%] bottom-[50%]"
              width={20}
              height={20}
              fill={false}
            />
            <Circle
              className="circle right-[13%] top-[30%]"
              width={20}
              height={20}
            />
            <Circle
              className="circle right-[20%] bottom-[29%]"
              width={65}
              height={65}
            />
            <Circle
              className="circle right-[35%] bottom-[12%]"
              width={37}
              height={37}
              fill={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
