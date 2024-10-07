import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeMain from "./home/homeMain";
import Referral from "./referAndEarn/referral";
import Details from "./referAndEarn/details";
import Bundel from "./bundles/bundle";
import BundleDetails from "./bundles/bundleDetails";
import Rewards from "./rewards/rewards";
import RewardsDetail from "./rewards/rewardsDetail";


function RewardsMain() {
  return (
    <>    
    <Routes>
      <Route path="/" element={<HomeMain />} />
      <Route path="/referral/create" element={<Referral/>} />
      <Route path="/referral/edit/:referralId" element={<Referral/>} />
      <Route path="/referral/detail/:referralId" element={<Details/>} />

      <Route path="/bundle/create" element={<Bundel/>} />
      <Route path="/bundle/edit/:bundleId" element={<Bundel/>} />
      <Route path="/bundle/detail/:bundleId" element={<BundleDetails/>} />

      <Route path="/create" element={<Rewards/>} />
      <Route path="/edit/:rewardId" element={<Rewards/>} />
      <Route path="/detail/:rewardId" element={<RewardsDetail/>} />

    </Routes>
    </>

  );
}

export default RewardsMain;
