"use client"
import React from 'react';
import { Button, Form, Input, message, theme } from 'antd';
import { useRouter } from 'next/navigation';
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { api_urls } from "@/lib/urls";
import session from "@/lib/session";
import Api from "@/lib/request-service";

const SignUp = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const { token: { colorPrimary } } = theme.useToken();

    const onFinish = async (values) => {
        const response = await Api.post(api_urls.AUTH.register, values, false);
        console.log("status", (response))
        if (response?.data.password) {
            messageApi.open({
                type: 'success',
                content: response.data.message,
                duration: 5,
            });
            setTimeout(async () => {
                await router?.push('/login');
            }, 5000);
        } else  {
            const err = response?.data?.errors;
            Object.keys(err).forEach((key) => {
                messageApi.open({
                    type: 'error',
                    content: err[key],
                    duration: 5,
                });
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <Form
                layout="vertical"
                name="signup"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ width: '100%', marginTop: 30 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size='large'
            >
                <Title className="mb-4" level={5}>Sign Up</Title>

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Full Name"
                    name="full_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your full name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please input a valid email address!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Sign Up
                    </Button>
                </Form.Item>

                <p className="text-center">Have an account? <Link href="/login" style={{ color: colorPrimary }}>Log In</Link></p>
            </Form>
        </>
    );
};

export default SignUp;
