import React from "react";
import MailLayout from "./MailLayout";

const NewLeadReceived = (data: any) => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[18px] mt-0 text-center text-[#e38b2a] uppercase font-bold leading-normal">
                    NEW LEAD RECIEVED!
                </p>

                <p className="text-[16px] text-left mt-5 text-black leading-7">
                    A new lead has been assigned to you for follow-up.
                    <br />
                    <b>Lead Details:</b>
                    <br />
                    <ul>
                        <li className="text-[16px] text-left text-black">
                            Name: [Lead Name]
                        </li>
                        <li className="text-[16px] text-left text-black">
                            Lead ID: [Lead ID]
                        </li>
                        <li className="text-[16px] text-left text-black">
                            Contact Number: [Lead Contact Number]
                        </li>
                        <li className="text-[16px] text-left text-black">
                            Date Assigned: [Date]
                        </li>
                    </ul>
                </p>

                <br />
                {/* Button */}
                <div className="text-center">
                    <a
                        href={data.btnLink}
                        className="border border-none cursor-pointer text-[15px] text-white py-3 px-6 w-fit mx-auto rounded"
                        style={{
                            background:
                                "linear-gradient(to right, #dc322f, #ffcd32)",
                            textDecoration: "none",
                        }}
                    >
                        LEAD DETAILS
                    </a>
                </div>
                <br />
                <p className="text-[16px] text-left mt-5 text-black leading-7">
                    Please ensure timely communication with the lead to guide
                    them through the next steps.
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

export default NewLeadReceived;
