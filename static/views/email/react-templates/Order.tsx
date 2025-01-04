import React from "react";
import MailLayout from "./MailLayout";

const Order = (data: any) => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[20px] mt-0 text-center text-[#e38b2a] uppercase font-bold leading-normal">
                    Thank you for ORDERING YOUR KIT
                </p>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    Thank you for placing your Stock Order with Tongue Tinglers! We’re pleased to
                    confirm that your order has been successfully received and is being processed.
                    <br />
                    <b>Order Details:</b>
                    <ul>
                        <li className="text-[17px] text-left text-black">Order Id:</li>
                        <li className="text-[17px] text-left text-black">Items Ordered:</li>
                        <li className="text-[17px] text-left text-black">Order Total:</li>
                        <li className="text-[17px] text-left text-black">Order Date:</li>
                    </ul>
                </p>

                {/* Button */}
                <div className="text-center">
                    <a
                        href={data.btnLink}
                        className="border border-none cursor-pointer text-[16px] text-white py-3 px-6 w-fit mx-auto rounded"
                        style={{
                            background: "linear-gradient(to right, #dc322f, #ffcd32)",
                            textDecoration: "none",
                        }}
                    >
                        WHAT'S NEXT?
                    </a>
                </div>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    Our team is processing your order and will have it dispatched shortly. You’ll
                    receive a notification with tracking details once your sample kit is on its way.
                    Together, we’re building a legacy of flavor and tradition!
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

export default Order;
