"use client";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BreadcrumbComponent: React.FC = () => {
  const path = usePathname();
  const pathSnippets = path.split("/").filter((i) => i);

  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const fontWeight = 550 - index * 100;
    return {
      key: url,
      title: (
        <Link href={url}>
          <p
            style={{
              color: "black",
              fontWeight: fontWeight < 100 ? 100 : fontWeight,
              textTransform: "capitalize",
            }}
          >
            {_}
          </p>
        </Link>
      ),
    };
  });

  return (
    <Breadcrumb
      style={{
        marginTop: "16px",
        marginLeft: "16px",
      }}
      items={breadcrumbItems}
    />
  );
};

export default BreadcrumbComponent;
