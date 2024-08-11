"use client"
import React from 'react';
import { Button, Checkbox, Flex, Form, Input, message, theme } from 'antd';
import { api_urls } from "@/lib/urls";
import session from "@/lib/session";
import { useRouter } from 'next/navigation'
import Api from "@/lib/request-service";
import Link from "next/link";

const Login = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const { token: { colorPrimary } } = theme.useToken();

    const onFinish = async (values) => {
        console.log('onFinish', values)
        const user = {
            username: values.username,
            password: values.password
        }
        try {
            const response = await Api.post(api_urls.AUTH.login, user, false)
            console.log("user", response)
            if (response?.data.access) {
                session.setUser(
                    JSON.stringify(response?.data?.user)
                )
                session.setToken(
                    JSON.stringify(response?.data?.access)
                );
                session.setRefreshToken(
                    JSON.stringify(response?.data?.refresh)
                );

                await router?.push('/dashboard')
            } else if (response?.data.statusCode === 400) {
                const err = response?.data?.errors;
                Object.keys(err).forEach((key) => {
                    messageApi.open({
                        type: 'error',
                        content: err[key],
                        duration: 5,
                    });
                });
            } else {
                console.log("check", response);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                messageApi.open({
                    type: 'error',
                    content: 'Unauthorized: Invalid username or password.',
                    duration: 5,
                });
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'An unexpected error occurred. Please try again.',
                    duration: 5,
                });
            }
            console.error('Error during login:', error);
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
                name="login"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ width: '100%' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size='large'
            >
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
                    label="Password"
                    name="password"
                    className="mb-2"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Flex justify="space-between" align="center" className="mb-4">
                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            span: 24,
                        }}
                        className="mb-0"
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <Link href="/forgot-password">Forgot Password</Link>
                </Flex>

                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <p className="text-center">Don't have an account? <Link href="/signup" style={{ color: colorPrimary }}>Sign Up</Link></p>
        </>
    );
};

export default Login;
