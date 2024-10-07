import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './homePage'
import CreateTask from './task/createTask'
import CreateDailyStreak from './dailyStreakTask/createDailyStreak'
import CreateReward from './dailyStreakReward/createReward'

function  DailyStreakRoutes() {
  return (
    <Routes>
    <Route path="/" element={<HomePage/>} />
    {/* Task section */}
    <Route path="/task/create" element={<CreateTask/>} />
    <Route path="/task/edit/:taskId" element={<CreateTask/>} />
    {/* taskList create */}
    <Route path="/tasklist/create" element={<CreateDailyStreak/>} />
    <Route path="/tasklist/edit/:taskId" element={<CreateDailyStreak/>} />
    {/* reward list create */}
    <Route path="/rewardList/create" element={<CreateReward/>} />
    <Route path="/rewardList/edit/:taskId" element={<CreateReward/>} />

  </Routes>
  )
}

export default DailyStreakRoutes