"use client"
import '@/app/globals.css'
import { Layout } from 'antd';

import { Content } from 'antd/es/layout/layout';
import { Container } from '@/UI/Container/Container';

export default function LocaleLayout({children, params: {locale}}: any) {
    return (

        <Layout style={{height: '100%', background: 'white'}} >
            <Container>
                <Layout className="site-layout" style={{height: '100%', background: 'white'}}>
                    
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        {children}
                    </Content>
                
                </Layout>
            </Container>
            
        </Layout>

)
}