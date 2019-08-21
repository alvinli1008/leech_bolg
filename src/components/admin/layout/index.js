import React, { Component } from "react";
import { Layout } from "antd";
import SiderNav from "../sider";
import AdminHeader from '../header'

const { Header, Sider, Content, Footer } = Layout;

export default class LayoutNav extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <SiderNav />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <AdminHeader collapsed={this.state.collapsed} onToggle={this.toggle} />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Leech Blog ©2019 Created by wx uleechao
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
