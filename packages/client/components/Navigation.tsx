import {Layer} from 'baseui/layer';
import React, {useState} from 'react';
import {styled} from 'baseui';
import {ALIGN, HeaderNavigation, StyledNavigationItem, StyledNavigationList} from 'baseui/header-navigation';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {Button} from 'baseui/button';
import {Container} from './Container';
import {hasToken, removeToken} from '../utils/auth';
import {useMount} from 'react-use';

const NavigationWrapper = styled('div', {
    background: 'white',
    boxSizing: 'border-box',
    width: '100vw',
    position: 'fixed',
    top: '0',
    left: '0',
});


export const Navigation = () => {
    let [isAuthenticated, setIsAuthenticated] = useState(false);
    useMount(() => {
        setIsAuthenticated(hasToken());
    });

    const router = useRouter();

    function handleLogout() {
        removeToken();

        // noinspection JSIgnoredPromiseFromCall
        router.push('/login');
    }

    return (
        <Layer>
            <NavigationWrapper>
                <Container>
                    <HeaderNavigation>
                        <StyledNavigationList $align={ALIGN.left}>
                            <StyledNavigationItem>
                                <Link href="/">
                                    <Button kind="minimal" size="compact">Github Search Test</Button>
                                </Link>
                            </StyledNavigationItem>
                        </StyledNavigationList>
                        <StyledNavigationList $align={ALIGN.center}/>
                        <StyledNavigationList $align={ALIGN.right}>
                            {isAuthenticated && (
                                <StyledNavigationItem>
                                    <Link href="/report">
                                        <Button size="compact">Report</Button>
                                    </Link>
                                </StyledNavigationItem>
                            )}
                            <StyledNavigationItem>
                                {isAuthenticated ? (
                                    <Button size="compact" onClick={handleLogout}>Logout</Button>
                                ) : (
                                    <Link href="/login">
                                        <Button size="compact">Login</Button>
                                    </Link>
                                )}
                            </StyledNavigationItem>
                        </StyledNavigationList>
                    </HeaderNavigation>
                </Container>
            </NavigationWrapper>
        </Layer>
    );
};
