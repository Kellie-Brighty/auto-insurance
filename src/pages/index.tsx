import Image from "next/image";
import {
  PlayCircleIcon,
  StarIcon as StarIconSolid,
} from "@heroicons/react/24/solid";
import {
  Bars3BottomRightIcon,
  EnvelopeIcon,
  IdentificationIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
  StarIcon as StarIconOutline,
} from "@heroicons/react/24/outline";
import { useState, useContext, useEffect } from "react";
import DialogComponent from "@/common/dialog/index.component";
import RegisterAgentComponent from "@/components/agent/register/index.component";
import GetEstimateForSubscriberComponent from "@/components/subscriber/get-estimate/index.component";
import Link from "next/link";
import SubscriberPremiumCalculatorComponent from "@/components/subscriber/premium-calculator/index.component";
import { GlobalContext } from "../../services/context";

export default function Home() {
  const [openRegisterAgentDialog, setOpenRegisterAgentDialog] = useState(false);
  const [openGetEstimateDialog, setOpenGetEstimateDialog] = useState(false);
  const [openPremiumCalculatorDialog, setOpenPremiumCalculatorDialog] =
    useState(false);
  const { estimateModal, setEstimateModal } = useContext(GlobalContext);

  useEffect(() => {
    if (estimateModal) {
      setOpenGetEstimateDialog(false);
    }
  }, [estimateModal]);

  return (
    <>
      <div>
        {/* Banner */}
        <section
          className={"w-full h-full text-white"}
          style={{
            backgroundImage: "url('/assets/landing/banner.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <nav
            className={
              "w-full p-8 flex items-center justify-between gap-4 backdrop-blur-md"
            }
          >
            <div className={"relative w-[193px] h-[33px]"}>
              <Image
                layout={"fill"}
                objectFit={"contain"}
                src={"/logo.png"}
                alt={"AutoFlex"}
              />
            </div>

            <div className={"hidden lg:flex items-center gap-8"}>
              <Link href="/auth/choose-user-type">
                <button className={"text-sm lg:text-xl font-sans"}>
                  Sign In
                </button>
              </Link>

              <button
                className={"text-sm lg:text-xl font-sans"}
                onClick={() => {
                  setOpenGetEstimateDialog(true);
                }}
              >
                Get Estimate
              </button>

              <button
                onClick={() => {
                  setOpenRegisterAgentDialog(true);
                }}
                className={
                  "py-3 px-6 text-sm lg:text-xl font-sans font-medium bg-primary rounded-md"
                }
              >
                Become an Agent
              </button>
            </div>

            <button className={"lg:hidden"}>
              <Bars3BottomRightIcon className={"w-8 h-8"} />
            </button>
          </nav>

          <div className={"p-8 lg:p-24 space-y-8"}>
            <div className={"max-w-xl space-y-4"}>
              <h1 className={"text-4xl lg:text-7xl font-grotesk font-bold"}>
                Flexible Comprehensive Auto Insurance
              </h1>
              <p className={"text-sm lg:text-xl font-sans"}>
                Comprehensive Motor Insurance covers your car against accidental
                damage, fire, theft and loss to life and property.
              </p>
            </div>

            <div className={"flex flex-wrap items-center gap-4"}>
              <button
                onClick={() => {
                  setOpenGetEstimateDialog(true);
                }}
                className={
                  "py-3 px-6 text-sm lg:text-xl font-sans font-medium bg-primary rounded-md"
                }
              >
                Become a Subscriber
              </button>

              <button className={"flex items-center gap-1"}>
                <PlayCircleIcon className={"w-12 h-12 text-white"} />
                <span className={"text-sm lg:text-xl font-sans"}>
                  Watch Videos
                </span>
              </button>
            </div>

            <div className={"flex flex-wrap items-center gap-4"}>
              <div className={"relative w-[176px] h-[48px]"}>
                <Image
                  layout={"fill"}
                  objectFit={"contain"}
                  src={"/assets/landing/users.png"}
                  alt={"AutoFlex"}
                />
              </div>

              <span className={"text-sm lg:text-xl font-sans"}>
                Join 5000+ Happy
                <br />
                Subscribers!
              </span>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className={"p-8 lg:p-24 space-y-8"}>
          <h1 className={"text-4xl lg:text-7xl font-grotesk font-bold"}>
            Plans
          </h1>

          <div className={"grid grid-cols-12 gap-8"}>
            <div
              className={
                "col-span-12 lg:col-span-6 p-8 lg:p-16 space-y-4 bg-plans-yearly rounded-xl"
              }
            >
              <h2 className={"text-xl lg:text-4xl font-sans font-normal"}>
                Yearly Plan
              </h2>
              <p className={"text-sm lg:text-xl font-sans font-medium"}>
                Suitable for car lovers seeking all rounded protection, this
                plan covers:
              </p>
              <ul className={"px-8 text-sm lg:text-xl font-sans list-disc"}>
                <li>Accident</li>
                <li>Third Party Liability</li>
                <li>Personals Accident Cover etc...</li>
                <li>Theft</li>
                <li>Natural Calamities</li>
                <li>Choice Of Add One</li>
              </ul>
            </div>

            <div
              className={
                "col-span-12 lg:col-span-6 p-8 lg:p-16 space-y-4 bg-plans-quarterly rounded-xl"
              }
            >
              <h2 className={"text-xl lg:text-4xl font-sans font-normal"}>
                Yearly Plan
              </h2>
              <p className={"text-sm lg:text-xl font-sans font-medium"}>
                Suitable for car lovers seeking all rounded protection, this
                plan covers:
              </p>
              <ul className={"px-8 text-sm lg:text-xl font-sans list-disc"}>
                <li>Accident</li>
                <li>Third Party Liability</li>
                <li>Personals Accident Cover etc...</li>
                <li>Theft</li>
                <li>Natural Calamities</li>
                <li>Choice Of Add One</li>
              </ul>
            </div>

            <div
              className={
                "col-span-12 lg:col-span-6 p-8 lg:p-16 space-y-4 bg-plans-monthly rounded-xl"
              }
            >
              <h2 className={"text-xl lg:text-4xl font-sans font-normal"}>
                Monthly Plan
              </h2>
              <p className={"text-sm lg:text-xl font-sans font-medium"}>
                Suitable for car lovers seeking all rounded protection, this
                plan covers:
              </p>
              <ul className={"px-8 text-sm lg:text-xl font-sans list-disc"}>
                <li>Accident</li>
                <li>Third Party Liability</li>
                <li>Personals Accident Cover etc...</li>
                <li>Theft</li>
                <li>Natural Calamities</li>
                <li>Choice Of Add One</li>
              </ul>
            </div>

            <div
              className={
                "col-span-12 lg:col-span-6 p-8 lg:p-16 space-y-4 bg-plans-weekly rounded-xl"
              }
            >
              <h2 className={"text-xl lg:text-4xl font-sans font-normal"}>
                Weekly Plan
              </h2>
              <p className={"text-sm lg:text-xl font-sans font-medium"}>
                Suitable for car lovers seeking all rounded protection, this
                plan covers:
              </p>
              <ul className={"px-8 text-sm lg:text-xl font-sans list-disc"}>
                <li>Accident</li>
                <li>Third Party Liability</li>
                <li>Personals Accident Cover etc...</li>
                <li>Theft</li>
                <li>Natural Calamities</li>
                <li>Choice Of Add One</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={"p-8 lg:p-24 space-y-8 bg-gray-light"}>
          <div className={"space-y-4"}>
            <h1 className={"text-4xl lg:text-7xl font-grotesk font-bold"}>
              Become an Agent
            </h1>
            <p className={"text-sm lg:text-xl font-sans"}>
              The following are basic requirements to register as an agent:
            </p>
          </div>

          <div className={"flex flex-wrap items-center justify-center gap-8"}>
            <div
              className={
                "w-full lg:flex-1 p-8 flex items-center gap-4 bg-white border border-gray-dark rounded-md"
              }
            >
              <div className={"p-4 bg-gray-main rounded-full"}>
                <PhoneIcon className={"w-8 h-8"} />
              </div>

              <div>
                <h2 className={"text-sm lg:text-xl font-sans font-bold"}>
                  Phone Number
                </h2>
                <p className={"text-xs lg:text-base"}>
                  Enter a verifiable phone number.
                </p>
              </div>
            </div>

            <div
              className={
                "w-full lg:flex-1 p-8 flex items-center gap-4 bg-white border border-gray-dark rounded-md"
              }
            >
              <div className={"p-4 bg-gray-main rounded-full"}>
                <EnvelopeIcon className={"w-8 h-8"} />
              </div>

              <div>
                <h2 className={"text-sm lg:text-xl font-sans font-bold"}>
                  Email Address
                </h2>
                <p className={"text-xs lg:text-base"}>
                  Enter a verifiable email address.
                </p>
              </div>
            </div>

            <div
              className={
                "w-full lg:flex-1 p-8 flex items-center gap-4 bg-white border border-gray-dark rounded-md"
              }
            >
              <div className={"p-4 bg-gray-main rounded-full"}>
                <IdentificationIcon className={"w-8 h-8"} />
              </div>

              <div>
                <h2 className={"text-sm lg:text-xl font-sans font-bold"}>
                  Mode of Identification
                </h2>
                <p className={"text-xs lg:text-base"}>
                  Enter a verifiable identification proof like international
                  passport.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={"p-8 lg:p-24 flex flex-wrap gap-8 lg:gap-24"}>
          <div className={"w-full lg:w-1/3 space-y-2"}>
            <h1 className={"text-4xl lg:text-7xl font-grotesk font-bold"}>
              Frequently Asked Questions
            </h1>
            <p className={"text-sm lg:text-xl font-sans"}>
              Don’t find your answer here? Just send us message.
            </p>
          </div>

          <div
            className={
              "flex-1 p-8 space-y-4 bg-gray-light divide-y-2 divide-gray-main rounded-xl"
            }
          >
            <div className={"space-y-2"}>
              <div className={"flex items-center justify-between gap-4"}>
                <h2 className={"text-lg lg:text-3xl font-grotesk font-bold"}>
                  How does Charge Deals make money?
                </h2>

                <MinusIcon className={"w-4 h-4"} />
              </div>

              <h2 className={"text-xs lg:text-lg font-sans"}>
                The cost to use our app is free for EV drivers. Businesses who
                advertise on the platform pay a small fee to have their deals
                shown.
              </h2>
            </div>

            <div className={"pt-2 space-y-2"}>
              <div className={"flex items-center justify-between gap-4"}>
                <h2 className={"text-lg lg:text-3xl font-grotesk font-bold"}>
                  How do I filter locations by criteria?
                </h2>

                <PlusIcon className={"w-4 h-4"} />
              </div>
            </div>

            <div className={"pt-2 space-y-2"}>
              <div className={"flex items-center justify-between gap-4"}>
                <h2 className={"text-lg lg:text-3xl font-grotesk font-bold"}>
                  What are the benefits of creating a Charge Deals account?
                </h2>

                <PlusIcon className={"w-4 h-4"} />
              </div>
            </div>

            <div className={"pt-2 space-y-2"}>
              <div className={"flex items-center justify-between gap-4"}>
                <h2 className={"text-lg lg:text-3xl font-grotesk font-bold"}>
                  I am having an issue charging my vehicle.
                </h2>

                <PlusIcon className={"w-4 h-4"} />
              </div>
            </div>

            <div className={"pt-2 space-y-2"}>
              <div className={"flex items-center justify-between gap-4"}>
                <h2 className={"text-lg lg:text-3xl font-grotesk font-bold"}>
                  What information does Charge?
                </h2>

                <PlusIcon className={"w-4 h-4"} />
              </div>
            </div>
          </div>
        </section>

        <section
          className={"p-8 pt-0 lg:p-24 lg:pt-0 flex flex-wrap gap-8 lg:gap-24"}
        >
          <h1
            className={
              "w-full text-4xl lg:text-7xl text-center font-grotesk font-bold"
            }
          >
            Real clients with honest reviews.
          </h1>

          <div className={"p-2 flex items-center gap-6 overflow-auto"}>
            <div
              className={
                "flex-none flex-shrink-0 w-11/12 max-w-lg p-8 space-y-2 border border-gray-main rounded-xl rotate-2"
              }
            >
              <div className={"flex items-center gap-2"}>
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconOutline
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
              </div>

              <h2 className={"text-xl lg:text-4xl font-sans font-bold"}>
                Sonia Khanna
              </h2>

              <p className={"text-sm lg:text-xl font-sans"}>
                Got good deal without agent calling or speaking to anyone.
              </p>
            </div>

            <div
              className={
                "flex-none flex-shrink-0 w-11/12 max-w-lg p-8 space-y-2 border border-gray-main rounded-xl -rotate-2"
              }
            >
              <div className={"flex items-center gap-2"}>
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconOutline
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
              </div>

              <h2 className={"text-xl lg:text-4xl font-sans font-bold"}>
                Sonia Khanna
              </h2>

              <p className={"text-sm lg:text-xl font-sans"}>
                Got good deal without agent calling or speaking to anyone.
              </p>
            </div>

            <div
              className={
                "flex-none flex-shrink-0 w-11/12 max-w-lg p-8 space-y-2 border border-gray-main rounded-xl rotate-2"
              }
            >
              <div className={"flex items-center gap-2"}>
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconOutline
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
              </div>

              <h2 className={"text-xl lg:text-4xl font-sans font-bold"}>
                Sonia Khanna
              </h2>

              <p className={"text-sm lg:text-xl font-sans"}>
                Got good deal without agent calling or speaking to anyone.
              </p>
            </div>

            <div
              className={
                "flex-none flex-shrink-0 w-11/12 max-w-lg p-8 space-y-2 border border-gray-main rounded-xl -rotate-2"
              }
            >
              <div className={"flex items-center gap-2"}>
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconSolid
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
                <StarIconOutline
                  className={"w-5 lg:w-8 h-5 lg:h-8 text-primary"}
                />
              </div>

              <h2 className={"text-xl lg:text-4xl font-sans font-bold"}>
                Sonia Khanna
              </h2>

              <p className={"text-sm lg:text-xl font-sans"}>
                Got good deal without agent calling or speaking to anyone.
              </p>
            </div>
          </div>
        </section>

        <footer
          className={
            "w-full p-8 flex flex-wrap items-center justify-around gap-2 text-gray-dark border-t border-t-gray-main"
          }
        >
          <div className={"relative w-[193px] h-[33px]"}>
            <Image
              layout={"fill"}
              objectFit={"contain"}
              src={"/logo.png"}
              alt={"AutoFlex"}
            />
          </div>

          <span>&copy; univesalinsurance PLC 2023</span>

          <div className={"flex flex-wrap items-center gap-4"}>
            <span>universalisuranceplc.com </span>
            <span>+234(1)2934645</span>
          </div>
        </footer>
      </div>

      <DialogComponent
        show={openRegisterAgentDialog}
        onClose={() => {
          setOpenRegisterAgentDialog(false);
        }}
      >
        <RegisterAgentComponent />
      </DialogComponent>

      <DialogComponent
        show={openGetEstimateDialog}
        onClose={() => {
          setOpenGetEstimateDialog(false);
        }}
      >
        <GetEstimateForSubscriberComponent />
      </DialogComponent>

      <DialogComponent
        show={estimateModal}
        onClose={() => {
          setEstimateModal(false);
        }}
      >
        <SubscriberPremiumCalculatorComponent />
      </DialogComponent>
    </>
  );
}
