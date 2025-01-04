import React from "react";
import MailLayout from "./MailLayout";

const SampleKitOrder = (data: any) => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[20px] mt-0 text-center text-[#e38b2a] uppercase font-bold leading-normal">
                    Thank you for ORDERING YOUR KIT
                </p>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    It is not just a kit but a promise.
                    <br />
                    Your order marks the beginning of an exciting journey
                </p>

                {/* Button */}
                <div className="text-center">
                    <a
                        href={data.btnLink}
                        className="border border-none cursor-pointer text-[16px] text-white py-3 px-6 w-fit mx-auto rounded"
                        style={{
                            background:
                                "linear-gradient(to right, #dc322f, #ffcd32)",
                            textDecoration: "none",
                        }}
                    >
                        ORDER DETAILS
                    </a>
                </div>
                <div className="flex justify-center items-center mt-5 w-full">
                    <img
                        src=""
                        className="w-72 h-28 bg-red-400 my-auto"
                        alt=""
                    />
                    <ul className="w-full text-[15px]  text-left text-black leading-5">
                        <li className="text-[15px] text-left text-black">
                            Order Id:
                        </li>
                        <li className="text-[15px] text-left text-black">
                            Order Date:
                        </li>
                        <li className="text-[15px] text-left text-black">
                            Sample Kit:
                        </li>
                        <li className="text-[15px] text-left text-black">
                            Option:
                        </li>
                        <li className="text-[15px] text-left text-black">
                            Quantity:
                        </li>
                        <li className="text-[15px] text-left text-black">
                            Total Amount:
                        </li>
                    </ul>
                </div>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    Our team is processing your order and will have it
                    dispatched shortly. You’ll receive a notification with
                    tracking details once your sample kit is on its way. Thank
                    you for choosing Tongue Tinglers. This is just the beginning
                    of something extraordinary.
                    <br />
                    <br />
                    Warm regards,
                    <br />
                    Tongue Tinglers Team
                </p>
            </div>
        </div>
    </MailLayout>
);

export default SampleKitOrder;
