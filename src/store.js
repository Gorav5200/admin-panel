import { configureStore } from "@reduxjs/toolkit";
import questionBankSlice from "./ducks/questionBankSlice";
import userSlice from "./ducks/userSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { usersApi } from "./services/apis/users";
import { questionApi } from "./services/apis/exam/questionBank";
import { faqApi } from "./services/apis/faq";
import { subjectApi } from "./services/apis/dataManagement/subject";
import { topicApi } from "./services/apis/dataManagement/topic";
import { entityApi } from "./services/apis/dataManagement/entity";
import { entityTypeApi } from "./services/apis/dataManagement/entityType";
import { subTopicApi } from "./services/apis/dataManagement/subTopic";
import { mocksApi } from "./services/apis/exam/mock";
import subjectSlice from "./ducks/dataManagementSlice/subjectSlice";
import topicSlice from "./ducks/dataManagementSlice/topicSlice";
import subTopicSlice from "./ducks/dataManagementSlice/subTopicSlice";
import entityTypeSlice from "./ducks/dataManagementSlice/entityTypeSlice";
import mockSlice from "./ducks/mockSlice";
import mockGroupsSlice from "./ducks/mockGroupsSlice";
import packageSlice from "./ducks/mockPackageSlice";
import classSlice from "./ducks/exams/classSlice";
import examSlice from "./ducks/exams/examSlice";
import pastPaperSlice from "./ducks/pastPaperSlice";
import dailyQuizSlice from "./ducks/dailyQuizSlice";
import { instructionsApi } from "./services/apis/dataManagement/instructions";
import { termsApi } from "./services/apis/dataManagement/terms";
import { percentileApi } from "./services/apis/dataManagement/percentile";
import { groupsApi } from "./services/apis/exam/group";
import { authApi} from "./services/apis/auth";
import { classApi } from "./services/apis/exam/class";
import courseSlice from "./ducks/exams/courseSlice";
import { courseApi } from "./services/apis/exam/courses";
import { specificationApi } from "./services/apis/exam/specification";
import specificationSlice from "./ducks/exams/specificationSlice";
import drawerSlice from "./ducks/drawerSlice";
import { learnApi } from "./services/apis/learnApi";
import learnSlice from "./ducks/learnSlice";
import assignmentSlice from "./ducks/assignmentSlice";
import { assignmentApi } from "./services/apis/assignmentApi";
import { pastPaperApi } from "./services/apis/pastPapersApi";
import practiceQa from "./ducks/practiceQaSlice";
import { practiceQaApi } from "./services/apis/practiceQaApi";
import { commonApi } from "./services/apis/commonApi";
import { dailyQuizApi } from "./services/apis/dailyQuizApi";
import entitySlice from "./ducks/dataManagementSlice/entitySlice";
import addModule from "./ducks/addModuleSlice";
import { modulesApi } from "./services/apis/modulesApi";
import { accelareaderApi } from "./services/apis/accelareader";
import accelareaderSlice from "./ducks/accelareaderSlice";
import rewardSlice from "./ducks/rewardSlice";
import { rewardsApi } from "./services/apis/rewardsApi";
import { blogsApi } from "./services/apis/blogApi";
import blogSlice from "./ducks/blogSlice";
import { eventApi } from "./services/apis/eventApi";
import eventSlice from "./ducks/eventSlice";
import dailyStreakSlice from "./ducks/dailyStreakSlice";
import { dailyStreakApi } from "./services/apis/dailyStreakApi";
import { doubtApi } from "./services/apis/doubtApi";
import doubtSlice from "./ducks/doubtSlice";
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  questionBank: questionBankSlice,
  users: userSlice,
  entity:entitySlice,
  entityType: entityTypeSlice,
  subject: subjectSlice,
  topic: topicSlice,
  subTopic: subTopicSlice,
  mock: mockSlice,
  exam: examSlice,
  mockPackage: packageSlice,
  mockGroups: mockGroupsSlice,
  class: classSlice,
  courses: courseSlice,
  drawer: drawerSlice,
  examSpecification: specificationSlice,
  learn: learnSlice,
  assignment:assignmentSlice,
  pastPapers:pastPaperSlice,
  practiceQa:practiceQa,
  dailyQuiz:dailyQuizSlice,
  addModule:addModule,
  rewards:rewardSlice,
  accelareader:accelareaderSlice,
  blogs:blogSlice,
  events:eventSlice,
  dailyStreak:dailyStreakSlice,
  doubt:doubtSlice,
  [usersApi.reducerPath]: usersApi.reducer,
  [questionApi.reducerPath]: questionApi.reducer,
  [faqApi.reducerPath]: faqApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [entityApi.reducerPath]: entityApi.reducer,
  [entityTypeApi.reducerPath]: entityTypeApi.reducer,
  [topicApi.reducerPath]: topicApi.reducer,
  [subTopicApi.reducerPath]: subTopicApi.reducer,
  [mocksApi.reducerPath]: mocksApi.reducer,
  [instructionsApi.reducerPath]: instructionsApi.reducer,
  [percentileApi.reducerPath]: percentileApi.reducer,
  [termsApi.reducerPath]: termsApi.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [classApi.reducerPath]: classApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [assignmentApi.reducerPath]: assignmentApi.reducer,
  [specificationApi.reducerPath]: specificationApi.reducer,
  [learnApi.reducerPath]: learnApi.reducer,
  [assignmentApi.reducerPath]: assignmentApi.reducer,
  [pastPaperApi.reducerPath]: pastPaperApi.reducer,
  [practiceQaApi.reducerPath]: practiceQaApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [dailyQuizApi.reducerPath]: dailyQuizApi.reducer,
  [modulesApi.reducerPath]: modulesApi.reducer,
  [accelareaderApi.reducerPath]: accelareaderApi.reducer,
  [rewardsApi.reducerPath]: rewardsApi.reducer,
  [blogsApi.reducerPath]: blogsApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [dailyStreakApi.reducerPath]: dailyStreakApi.reducer,
  [doubtApi.reducerPath]:doubtApi.reducer
  // Add your other reducer(s) here
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      usersApi.middleware,
      questionApi.middleware,
      faqApi.middleware,
      subTopicApi.middleware,
      topicApi.middleware,
      entityApi.middleware,
      subjectApi.middleware,
      entityTypeApi.middleware,
      mocksApi.middleware,
      instructionsApi.middleware,
      termsApi.middleware,
      percentileApi.middleware,
      groupsApi.middleware,
      authApi.middleware,
      classApi.middleware,
      courseApi.middleware,
      assignmentApi.middleware,
      specificationApi.middleware,
      learnApi.middleware,
      assignmentApi.middleware,
      pastPaperApi.middleware,
      practiceQaApi.middleware,
      commonApi.middleware,
      dailyQuizApi.middleware,
      modulesApi.middleware,
      accelareaderApi.middleware,
      rewardsApi.middleware,
      blogsApi.middleware,
      eventApi.middleware,
      dailyStreakApi.middleware,
      doubtApi.middleware
        ]),
});


export const persistor = persistStore(store);


