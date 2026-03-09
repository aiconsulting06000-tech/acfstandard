'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function Navigation() {
  const t = useTranslations('nav')
  const tMenu = useTranslations('megaMenu')
  const params = useParams()
  const locale = params.locale as string
  
  const [menuOpen, setMenuOpen] = useState(false)
  const [activePanel, setActivePanel] = useState('framework')
  
  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 800,
        background: 'rgba(5,12,26,.92)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(201,168,76,.2)',
        height: '72px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 32px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,.15)',
              padding: '10px 12px',
              cursor: 'pointer',
              borderRadius: '6px'
            }}
          >
            <span style={{display: 'block', width: '20px', height: '1.5px', background: '#fff', borderRadius: '1px'}}></span>
            <span style={{display: 'block', width: '20px', height: '1.5px', background: '#fff', borderRadius: '1px'}}></span>
            <span style={{display: 'block', width: '20px', height: '1.5px', background: '#fff', borderRadius: '1px'}}></span>
          </button>
          
          <Link href={`/${locale}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '38px',
              height: '38px',
              background: '#c9a84c',
              borderRadius: '7px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 800,
              fontSize: '13px',
              color: '#050c1a'
            }}>ACF</div>
            <div>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                color: '#fff',
                lineHeight: 1.2
              }}>{t('logoText')}</div>
              <div style={{
                fontSize: '9.5px',
                color: '#c9a84c',
                letterSpacing: '.1em',
                textTransform: 'uppercase'
              }}>{t('logoSubtext')}</div>
            </div>
          </Link>
          
          <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
              <Link href={`/${locale}/standard`} style={{color: '#9db0c8', textDecoration: 'none', fontSize: '13px', fontWeight: 500}}>{t('theStandard')}</Link>
              <Link href={`/${locale}/acf-score`} style={{color: '#9db0c8', textDecoration: 'none', fontSize: '13px', fontWeight: 500}}>{t('acfScore')}</Link>
              <Link href={`/${locale}/control`} style={{color: '#9db0c8', textDecoration: 'none', fontSize: '13px', fontWeight: 500}}>{t('acfControl')}</Link>
              <Link href={`/${locale}/certification`} style={{color: '#9db0c8', textDecoration: 'none', fontSize: '13px', fontWeight: 500}}>{t('acfCertification')}</Link>
            </div>
            
            <Link href={`/${locale}/partners`} style={{
              background: 'transparent',
              border: '1px solid rgba(201,168,76,.2)',
              color: '#c9a84c',
              padding: '8px 14px',
              borderRadius: '6px',
              fontWeight: 600,
              fontSize: '12.5px',
              textDecoration: 'none'
            }}>{t('partners')}</Link>
            
            <Link href={`/${locale}/contact`} style={{
              background: '#c9a84c',
              color: '#050c1a',
              padding: '9px 18px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '12.5px',
              textDecoration: 'none'
            }}>{t('requestAssessment')}</Link>
          </div>
        </div>
      </nav>
      
      {menuOpen && (
        <>
          <div 
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,.7)',
              zIndex: 850,
              backdropFilter: 'blur(4px)'
            }}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '680px',
            maxWidth: '95vw',
            background: '#071122',
            borderRight: '1px solid rgba(201,168,76,.2)',
            zIndex: 860,
            display: 'flex'
          }}>
            <button 
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '18px',
                left: '18px',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,.07)',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '20px'
              }}
            >×</button>
            
            <div style={{
              width: '220px',
              background: '#0d1f3c',
              borderRight: '1px solid rgba(201,168,76,.2)',
              paddingTop: '72px'
            }}>
              <div 
                onClick={() => setActivePanel('framework')}
                style={{
                  padding: '15px 22px',
                  cursor: 'pointer',
                  borderLeft: activePanel === 'framework' ? '3px solid #c9a84c' : '3px solid transparent',
                  background: activePanel === 'framework' ? 'rgba(201,168,76,.14)' : 'transparent'
                }}
              >
                <span style={{fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '15px', color: activePanel === 'framework' ? '#c9a84c' : '#fff'}}>Framework</span>
              </div>
              
              <div 
                onClick={() => setActivePanel('products')}
                style={{
                  padding: '15px 22px',
                  cursor: 'pointer',
                  borderLeft: activePanel === 'products' ? '3px solid #c9a84c' : '3px solid transparent',
                  background: activePanel === 'products' ? 'rgba(201,168,76,.14)' : 'transparent'
                }}
              >
                <span style={{fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '15px', color: activePanel === 'products' ? '#c9a84c' : '#fff'}}>Products</span>
              </div>
            </div>
            
            <div style={{
              flex: 1,
              padding: '72px 32px 32px',
              overflowY: 'auto',
              color: '#fff'
            }}>
              {activePanel === 'framework' && (
                <div>
                  <h3 style={{fontSize: '22px', fontWeight: 700, marginBottom: '6px'}}>{tMenu('framework.title')}</h3>
                  <p style={{fontSize: '13px', color: '#6b7fa0', marginBottom: '24px'}}>{tMenu('framework.subtitle')}</p>
                  
                  <div style={{marginBottom: '20px'}}>
                    <div style={{fontSize: '10px', fontWeight: 700, letterSpacing: '.14em', color: '#c9a84c', marginBottom: '10px', textTransform: 'uppercase'}}>
                      {tMenu('framework.architecture.title')}
                    </div>
                    <ul style={{listStyle: 'none', padding: 0}}>
                      <li style={{marginBottom: '7px'}}>
                        <Link href={`/${locale}/standard#principles`} style={{color: '#9db0c8', fontSize: '13.5px', textDecoration: 'none'}}>
                          {tMenu('framework.architecture.principles')}
                        </Link>
                      </li>
                      <li style={{marginBottom: '7px'}}>
                        <Link href={`/${locale}/standard#layers`} style={{color: '#9db0c8', fontSize: '13.5px', textDecoration: 'none'}}>
                          {tMenu('framework.architecture.layers')}
                        </Link>
                      </li>
                      <li style={{marginBottom: '7px'}}>
                        <Link href={`/${locale}/standard#maturity`} style={{color: '#9db0c8', fontSize: '13.5px', textDecoration: 'none'}}>
                          {tMenu('framework.architecture.maturity')}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {activePanel === 'products' && (
                <div>
                  <h3 style={{fontSize: '22px', fontWeight: 700, marginBottom: '6px'}}>{tMenu('products.title')}</h3>
                  <p style={{fontSize: '13px', color: '#6b7fa0', marginBottom: '24px'}}>{tMenu('products.subtitle')}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
