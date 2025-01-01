import React, { useState } from "react";
import { Layout, Menu, Drawer, Button, Avatar, Dropdown, Card, Space } from "antd";
import { HomeOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import Appointments from "../pages/PatientPages/Appointments";
import Pharmacies from "../pages/PatientPages/Pharmacies";
import Reports from "../pages/PatientPages/Reports";
import Transactions from "../pages/PatientPages/Transactions";

const { Header, Content, Sider } = Layout;

const MenuItems = [
  {
    title: "Appointments",
    key: "1",
    icon: <HomeOutlined />,
    element: <Appointments />,
  },
  {
    title: "Pharmacy",
    key: "2",
    icon: <HomeOutlined />,
    element: <Pharmacies />,
  },
  { title: "Reports", key: "3", icon: <HomeOutlined />, element: <Reports /> },
  {
    title: "Transactions",
    key: "4",
    icon: <HomeOutlined />,
    element: <Transactions />,
  },
];

const Navbar = (data) => {
  console.log("navbar data", data);
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const [selectedMenu, setSelectedMenu] = useState("1");

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
            class
            name="text-white text-2xl font-bold"
            style={{ float: "left", color: "white", fontSize: "20px" }}
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
       
          <Card
            title="Name"
            extra={<a href="#">Edit</a>}
            style={{
              width: 330,
              height: 100,
            }}
          >
            <p>{data.data.name}</p>
          </Card>
        
      </Drawer>

      {/* Content Section */}
      <Layout style={{ marginTop: 64 }}>
        {/* Sider for Desktop View */}
        <Sider width={200} className="site-layout-background" theme="light">
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
