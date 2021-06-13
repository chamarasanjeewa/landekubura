import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import PartnerOne from "../../components/sections/partners/PartnerOne";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { Breadcrumb, Form, Input, Button, Checkbox, Row, Col } from "antd";

const profile = () => {
  return (
    <LayoutOne title="Login">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Profile</Breadcrumb.Item>
        </Breadcrumb>
        <div>Users profile</div>
        <PartnerOne />
      </Container>
    </LayoutOne>
  );
};

export default profile;
