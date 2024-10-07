import React from "react";
import { HeaderWithNavigation } from "../../../common/header";
import FullWidthTabs from "../../../common/tabChanger";
import DraftedBlog from "../tabsComponents/draftedBlog";
import BlogCategory from "../tabsComponents/blogCategory";
import BlogTags from "../tabsComponents/blogTags";
import ActiveBlogs from "../tabsComponents/activeBlogs";
import { blogApi } from "../../../../services/Constant";
import { useGetBlogListQuery } from "../../../../services/apis/blogApi";
import withQueryParams from "../../../common/FunctionComponents/withQueryParams";


function Main({queryString }) {

  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetBlogListQuery(`${blogApi.endPoint}/status/list?${queryString}`, {
      refetchOnMountOrArgChange: true,
    });
  return (
    <div>
      <HeaderWithNavigation cont={"Blogs"} />
      <FullWidthTabs
        data={[
          {
            id: 1,
            label: "Drafted Blogs",
            content: (
              <DraftedBlog
                blogs={data?.data.blogs}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                isSuccess={isSuccess}
                totalItems={data.data?.totalItems}
              />
            ),
            path: "/main/blogs?type=unPublish",
          },
          {
            id: 2,
            label: " Active Blogs",
            content: (
              <ActiveBlogs
                blogs={data?.data.blogs}
                isLoading={isLoading}
                isFetching={isFetching}
                isError={isError}
                isSuccess={isSuccess}
                totalItems={data.data?.totalItems}
              />
            ),
            path: "/main/blogs?type=publish",
          },

          {
            id: 3,
            label: "Blog Category",
            content: <BlogCategory />,
          },
          {
            id: 4,
            label: "Blog Tags",
            content: <BlogTags />,
          },
        ]}
      />
    </div>
  );
}

export default withQueryParams(Main);//WRAPPER | H0C | FOR GET QUERY PARAMS//
