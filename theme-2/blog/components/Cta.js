import config from "../config/config.json";
import Link from "next/link";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";
import { markdownify } from "../utils/textConverter";

function Cta() {
  const { title, content, button, enable } = config.call_to_action;
  if (!enable) return;

  return (
    <section className="">
      <div className="">
        <div className="p-20 relative px-4 text-center">
          <div className="animate relative z-10">
            {markdownify(title, "h2", "section-title")}
            {markdownify(content, "p", "mt-10")}
            <Link href={button.link} className="btn btn-primary mt-10">
              {button.label}
            </Link>
          </div>
          <div
            style={{
              backgroundColor: "rgb(255 247 243)",
            }}
            className="top-0 left-0 absolute h-full w-full"
          >
            <ImageFallback
              src="/blog/images/wave.svg"
              fill={true}
              sizes="100vw"
              alt="bg wave"
            />
            <Circle
              className="left-[10%] top-12"
              width={32}
              height={32}
              fill={false}
            />
            <Circle className="left-[3%] bottom-[13%]" width={85} height={85} />
            <Circle
              className="left-[15%] bottom-[35%]"
              width={47}
              height={47}
              fill={false}
            />

            <Circle className="right-[12%] top-[12%]" width={20} height={20} />
            <Circle
              className="right-[2%] bottom-[30%]"
              width={73}
              height={73}
              fill={false}
            />
            <Circle
              className="right-[19%] bottom-[16%]"
              width={37}
              height={37}
              fill={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;
