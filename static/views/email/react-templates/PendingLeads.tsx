import React from "react";
import MailLayout from "./MailLayout";

const PendingLeads = (data: any) => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[20px] mt-0 text-center text-[#db3330] uppercase font-bold leading-normal">
                    Action Required on Pending Leads
                </p>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    This is a reminder to take action on the following leads, which haven’t been
                    updated in the past two days:
                    <br />
                    <ul>
                        <li className="text-[17px] text-left text-black">
                            Lead ID 1 - Name - Status
                        </li>
                        <li className="text-[17px] text-left text-black">
                            Lead ID 2 - Name - Status
                        </li>
                        <li className="text-[17px] text-left text-black">
                            Lead ID 3 - Name - Status
                        </li>
                    </ul>
                </p>

                {/* Button */}
                <div className="text-center">
                    <a
                        href={data.btnLink}
                        className="border border-none cursor-pointer text-[16px] text-white py-3 px-6 w-fit mx-auto rounded"
                        style={{
                            background: "linear-gradient(to right, #dc322f, #ffcd32)",
                            textDecoration: "none"
                        }}
                    >
                        ACCESS ALL PENDING LEADS
                    </a>
                </div>

                <p className="text-[17px] text-left mt-5 text-black leading-7">
                    Please review and update the status of these leads as soon as possible. Timely
                    follow-ups are essential to ensure a smooth process for our prospects.
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

export default PendingLeads;
