import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GiPartyPopper } from 'react-icons/gi';
import { Web3Provider } from "./Web3Context";
import LandingPage from "./components/LandingPage";
import WalletConnection from "./components/WalletConnection";
import EventFactory from "./components/EventFactory";