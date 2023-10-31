import { Header } from '@/UI/Header/Header'
import '@/app/globals.css'
import type { Metadata } from 'next'
import { Layout } from 'antd';
import { AboutSidebar } from '@/Modules/AboutPage/AboutSidebar/AboutSidebar';
import initTranslations from '@/app/i18n';
import { Content } from 'antd/es/layout/layout';
import { Container } from '@/UI/Container/Container';

export default async function LocaleLayout({children, params: {locale}}: any) {
    const { t, options } = await initTranslations(locale, ['home']);

    return (

        <Layout style={{height: '100%', background: 'white'}} >
            {/* <AboutSidebar/> */}
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