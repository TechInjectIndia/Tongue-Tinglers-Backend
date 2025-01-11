import React from "react";
import MailLayout from "./MailLayout";

const CreateFranchise = (data: any) => (
    <MailLayout>
        <div className="bg-white rounded-lg p-6">
            <div className="p-0">
                <p className="text-[18px] mt-0 text-center text-[#e38b2a] uppercase font-bold leading-normal">
                    Congratulations on officially becoming a Tongue Tinglers
                    franchisee partner!
                </p>

                <p className="text-[16px] text-left mt-5 text-black leading-7">
                    We’re thrilled to welcome you to our ecosystem and look
                    forward to a successful journey together.
                    <br />
                    Your Access Details:
                    <br />
                    To get started, log in to the Tongue Tinglers Ecosystem
                    using the credentials below:
                    <br />
                    <ul>
                        <li className="text-[17px] text-left text-black">
                            Name: [Recipient's Name]
                        </li>
                        <li className="text-[17px] text-left text-black">
                            Email: [Recipient's Email]
                        </li>
                        <li className="text-[17px] text-left text-black">
                            Phone: [Recipient's Phone Number]
                        </li>
                    </ul>
                </p>
                <p className="text-[16px] mt-5 text-left text-black leading-7">
                    To activate your account and access the Tongue Tinglers
                    Ecosystem, please create your password.
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
                        CREATE YOUR PASSWORD
                    </a>
                </div>
                <br />
                <p className="text-[16px] text-left mt-5 text-black leading-7">
                    Once you’ve created your password, you’ll have full access
                    to tools, resources, and support to help you thrive as a
                    franchisee partner.
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

export default CreateFranchise;
