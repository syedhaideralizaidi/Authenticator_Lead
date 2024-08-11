"use client"
import React, {useEffect} from 'react'
import {Col, ConfigProvider, Flex, Row} from 'antd';
import Image from 'next/image'
// import auth from '@/assets/auth.png'
// import logo from '@/assets/logo.png'
// import {defaultSettings} from "@/app/themeConfig";
// import session from "@/lib/session";
import {useRouter} from "next/navigation";

const Layout = ({children}) => {
    let router = useRouter()
    // useEffect(()=>{
    //     if (session.getToken()){
    //         router.push('/dashboard')
    //     }
    //
    // },[])
    return (
        // <ConfigProvider theme={defaultSettings}>
            <div className="auth-screen">
                <Row>
                    <Col span={0} md={12}>
                        <div className="left-section-wrapper">
                            <Flex className="left-section" vertical={true} justify='space-between'>
                                {/*<Image className="logo" src={logo} alt="logo" width ="100%" priority={true} ></Image>*/}
                                {/*<h2><span className="text-primary">Asset Curve:</span> Secure, Cost-Effective Asset Tracking Solution</h2>*/}
                                {/*<Image className="auth-image" alt="auth image" src={auth} width ="100%"></Image>*/}
                            </Flex>
                        </div>
                    </Col>
                    <Col span={24} md={12}>
                        <Flex className="right-section" vertical={true} justify='space-between' align={'center'}>
                            <div></div>
                            <div className="form-wrapper">
                                {children}
                            </div>
                            <p>Privacy Policy   |   Terms & Conditions</p>
                        </Flex>
                    </Col>
                </Row>
            </div>
        // </ConfigProvider>
    )
}

export default Layout








