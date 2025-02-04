import React, { useState } from "react";
import {
  Layout,
  Menu,
  Drawer,
  Button,
  Avatar,
  Dropdown,
  Card,
  Space,
} from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  UserOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Appointments from "../pages/PatientPages/Appointments";
import Pharmacies from "../pages/PatientPages/Pharmacies";
import Reports from "../pages/PatientPages/Reports";
import Transactions from "../pages/PatientPages/Transactions";
import PatientCard from "./PatientCard";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import PaidIcon from "@mui/icons-material/Paid";
import ChatBot from "../pages/PatientPages/ChatBot";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const { Header, Content, Sider } = Layout;

const Navbar = (data) => {
  console.log("navbar data", data);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    sessionStorage.removeItem("authToken"); // Remove the token
    sessionStorage.removeItem("id"); // Remove the user id
    window.location.href = "/patient/login"; // Redirect to the login page
    
  };
  const [selectedMenu, setSelectedMenu] = useState("1");

  const MenuItems = [
    {
      title: "Appointments",
      key: "1",
      icon: <MedicationLiquidIcon />,
      element: <Appointments data={data.data} />,
    },
    {
      title: "Pharmacy",
      key: "2",
      icon: <VaccinesIcon />,
      element: <Pharmacies />,
    },
    {
      title: "Reports",
      key: "3",
      icon: <DocumentScannerIcon />,
      element: <Reports />,
    },
    {
      title: "Transactions",
      key: "4",
      icon: <PaidIcon />,
      element: <Transactions />,
    },
    {
      title: "Check your symptoms",
      key: "5",
      icon: <ChatBubbleIcon/>,
      element: <ChatBot/>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Navbar */}
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          backgroundColor: "#355438",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div className="logo" />
          <p
            classname="text-white text-4xl font-bold"
            style={{ float: "left", color: "white", fontSize: "25px" }}
          >
            HealthDrive
          </p>

          <Avatar
            size="large"
            icon={<UserOutlined />}
            onClick={showDrawer}
            style={{ cursor: "pointer", marginRight: 16 }}
          />
        </div>
      </Header>

      <Drawer
        title="Basic Patient Information"
        onClose={onClose}
        open={open}
        style={{ backgroundColor: "#c2d6c4" }}
      >
        <PatientCard data={data.data} />
        <div className="flex gap-3 items-center">
          <Button
            icon={<LogoutOutlined />}
            onClick={logOut}
            style={{ marginTop: "20" }}
          />
          <p className="font-bold">Logout</p>
        </div>
      </Drawer>

      {/* Content Section */}
      <Layout style={{ marginTop: 64 }}>
        {/* Sider for Desktop View */}
        <Sider width={220} className="site-layout-background" theme="light">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            {MenuItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                style={{ color: "#416044" }}
                onClick={() => setSelectedMenu(item.key)}
              >
                {item.title}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              backgroundColor: "white",
            }}
          >
            {MenuItems[parseInt(selectedMenu) - 1].element}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Navbar;
