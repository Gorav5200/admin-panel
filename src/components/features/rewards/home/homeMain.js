import React, { useEffect, useLayoutEffect, useState } from "react";
import FullWidthTabs from "../../../common/tabChanger";
import Header from "../../../common/header";
import PaginationTable from "../../../common/PaginationTable";
import { CustomButton, CustomButtonStyle } from "../../../../styles/muiRoot";
import { useLocation, useNavigate } from "react-router-dom";
import { BundleHeader, ReferralHeader } from "../tableHeaders";
import { PlusCircle } from "lucide-react";
import {
  useGetBundleListQuery,
  useGetReferralListQuery as useGetReferralListQueryById,
} from "../../../../services/apis/rewardsApi";
import { rewardsApi } from "../../../../services/Constant";
import { resetRewards } from "../../../../ducks/rewardSlice";
import { useDispatch } from "react-redux";
import RewardsHome from "../rewards/rewardsHome";
import DebouncedInput from "../../../common/searchApiField";

function HomeMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation();
  const query = new URLSearchParams(location.search);



  const searchTerm = query.get("search") || "";


  const [bundlePage, setBundlePage] = useState(1);
  const [bundleRowsPerPage, setBundleRowsPerPage] = useState(20);
  const [referralPage, setReferralPage] = useState(1);
  const [referralRowsPerPage, setReferralRowsPerPage] = useState(20);
  const [activeTab, setActiveTab] = useState(1); // default to the first tab

  useEffect(() => {
    dispatch(resetRewards());
  }, []);


  useEffect(() => {
    if (activeTab === 1) {
      navigate(
        `/main/rewards?page=${bundlePage}&count=${bundleRowsPerPage}&search=${searchTerm}`
      );
    } else if (activeTab === 3) {
      navigate(
        `/main/rewards?page=${referralPage}&count=${referralRowsPerPage}&search=${searchTerm}`
      );
    }
  }, [
  
    bundlePage,
    bundleRowsPerPage,
    referralPage,
    referralRowsPerPage,
   
  ]);



  const {
    data: getReferalList,
    isLoading: getRefLoad,
    isFetching: getReferalFetch,
    isError: getRefError,
  } = useGetReferralListQueryById(
    `${
      rewardsApi.referralEndPoint
    }/list?page=${referralPage}&limit=${referralRowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== 3,
    }
  );

  const {
    data: getBundleList,
    isLoading: getBundleLoad,
    isError: getBundleError,
    isFetching: getBundleFetch,
  } = useGetBundleListQuery(
    `${
      rewardsApi.bundleEndPoint
    }/list?page=${bundlePage}&limit=${bundleRowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
      skip: activeTab !== 1,
    }
  );


    const handleSearch = (term) => {
      if (activeTab === 1) {
        setBundlePage(1);
      } else if (activeTab === 3) {
        setReferralPage(1);
      }
      navigate(
        `/main/rewards?page=1&count=${
          activeTab === 1 ? bundleRowsPerPage : activeTab === 3?referralRowsPerPage:"N/a"
        }${term ? `&search=${term}` : ""}`
      );
    };


  const tabsData = [
    {
      id: 1,
      label: "Overview",
      content: "",
    },
    {
      id: 2,
      label: "Coin Bundle List",
      content: (
        <PaginationTable
          data={getBundleList?.data.bundleList || []}
          columns={BundleHeader}
          pageChange={(data) => {
            setBundlePage(data.page);
            setBundleRowsPerPage(data.rowsPerPage);
          }}
          count={getBundleList?.data.totalItems}
          searchBar={
            <DebouncedInput
              placeholder="Search By Reward"
              onSearch={(term) => handleSearch(term)}
              loading={getBundleFetch || getBundleLoad}
              initialValue={searchTerm}
            />
          }
          path={`/main/rewards/bundle/detail`}
          comp={
            <CustomButton
              startIcon={<PlusCircle />}
              onClick={() => navigate(`/main/rewards/bundle/create`)}
              style={{
                ...CustomButtonStyle,
                width: 186,
                borderRadius: 5,
                height: 45,
              }}
            >
              Create Bundle
            </CustomButton>
          }
          isError={getBundleError}
          isLoading={getBundleLoad || getBundleFetch}
        />
      ),
    },
    {
      id: 3,
      label: "Full Rewards List",
      content: <RewardsHome />,
    },
    {
      id: 4,
      label: "Refer and Earn",
      content: (
        <PaginationTable
          data={getReferalList?.data.referrals || []}
          columns={ReferralHeader}
          pageChange={(data) => {
            setReferralPage(data.page);
            setReferralRowsPerPage(data.rowsPerPage);
          }}
          count={getReferalList?.data.totalItems}
          searchBar={
            <DebouncedInput
              placeholder="Search by Referral"
              onSearch={(term) => handleSearch(term)}
              loading={getReferalFetch || getRefLoad}
              initialValue={searchTerm}
            />
          }
          path={`/main/rewards/referral/detail`}
          comp={
            <CustomButton
              startIcon={<PlusCircle />}
              onClick={() => navigate(`/main/rewards/referral/create`)}
              style={{
                ...CustomButtonStyle,
                width: 186,
                borderRadius: 5,
                height: 45,
              }}
            >
              Create Referral
            </CustomButton>
          }
          isError={getRefError}
          isLoading={getRefLoad || getReferalFetch}
        />
      ),
    },
  ];

  return (
    <div className="bg-red h-[70vh]">
      <Header content={"Rewards Overview"} />
      <FullWidthTabs data={tabsData} setHeading={setActiveTab} />
    </div>
  );
}

export default HomeMain;
