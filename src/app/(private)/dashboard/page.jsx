"use client"
import React, { useEffect, useState } from 'react';
import { Button, message, theme, Card, Typography } from 'antd';
import session from "@/lib/session";
import { useRouter } from 'next/navigation';
import { UserOutlined, MailOutlined, ProfileOutlined } from '@ant-design/icons';
import Api from "@/lib/request-service";
import { api_urls } from "@/lib/urls";

const { Title, Text } = Typography;

const Dashboard = () => {
    const router = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    const { token: { colorPrimary } } = theme.useToken();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user data from session
        const fetchUserData = async () => {
            try {
                const userData = session.getUser();
                if (userData) {
                    setUser(JSON.parse(userData));
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'No user data found. Please log in again.',
                        duration: 5,
                    });
                    router.push('/login'); // Navigate to login page if no user data
                }
            } catch (error) {
                messageApi.open({
                    type: 'error',
                    content: 'Failed to fetch user data. Please try again.',
                    duration: 5,
                });
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [messageApi, router]);

    const handleLogout = async () => {
        // try {
            await Api.post(api_urls.AUTH.logout);
            session.removeToken(); // Clear session
            router.push('/login'); // Navigate to login page
        // } catch (error) {
        //     messageApi.open({
        //         type: 'error',
        //         content: 'Failed to logout. Please try again.',
        //         duration: 5,
        //     });
        //     console.error('Error during logout:', error);
        // }
    };

    return (
        <>
            {contextHolder}
            <div style={{ width: '100%', padding: '20px' }}>
                <Title level={2}>User Dashboard</Title>
                {user ? (
                    <Card
                        style={{ width: '100%', maxWidth: 600, margin: '0 auto' }}
                        title="User Information"
                        extra={<Button type="primary" onClick={handleLogout}>Logout</Button>}
                        cover={<div style={{ display: 'flex', justifyContent: 'center' }}><UserOutlined style={{ fontSize: '48px', color: colorPrimary }} /></div>}
                    >
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong><UserOutlined /> Username: </Text>
                            <Text>{user.username}</Text>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong><MailOutlined /> Email: </Text>
                            <Text>{user.email}</Text>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <Text strong><ProfileOutlined /> First Name: </Text>
                            <Text>{user.name}</Text>
                        </div>
                        {/* Add other user details as needed */}
                    </Card>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </>
    );
};

export default Dashboard;
