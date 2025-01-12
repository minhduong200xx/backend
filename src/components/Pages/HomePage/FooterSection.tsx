"use client";
import React from "react";
import { Layout } from "antd";
import Link from "next/link";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  GithubOutlined,
  DribbbleOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterSection: React.FC = () => {
  return (
    <Footer
      className="text-center text-white"
      style={{ color: "white", backgroundColor: "#2563EB" }}
    >
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 h-56">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-white font-bold text-3xl whitespace-nowrap dark:text-white">
                eClinic
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-lg font-bold text-smoke-50 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-50 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    href="https://flowbite.com/"
                    className="hover:underline  text-gray-50"
                  >
                    eClinic
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg font-bold text-smoke-50 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-50 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline  text-gray-50"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline text-gray-50"
                    text-black
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-lg font-bold text-smoke-50 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-50 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline text-gray-50">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline text-gray-50">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-50 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link
              href="https://flowbite.com/"
              className="hover:underline"
              style={{ color: "white", fontSize: 16, fontWeight: 700 }}
            >
              eClinic™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              href="#"
              className="text-gray-50 hover:text-smoke-50 dark:hover:text-white"
            >
              <FacebookOutlined className="w-4 h-4" />
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link
              href="#"
              className="text-gray-50 hover:text-smoke-50 dark:hover:text-white ms-5"
            >
              <InstagramOutlined className="w-4 h-4" />
              <span className="sr-only">Instagram page</span>
            </Link>
            <Link
              href="#"
              className="text-gray-50 hover:text-smoke-50 dark:hover:text-white ms-5"
            >
              <TwitterOutlined className="w-4 h-4" />
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link
              href="#"
              className="text-gray-50 hover:text-smoke-50 dark:hover:text-white ms-5"
            >
              <GithubOutlined className="w-4 h-4" />
              <span className="sr-only">GitHub account</span>
            </Link>
            <Link
              href="#"
              className="text-gray-50 hover:text-smoke-50 dark:hover:text-white ms-5"
            >
              <DribbbleOutlined className="w-4 h-4" />
              <span className="sr-only">Dribbble account</span>
            </Link>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterSection;
