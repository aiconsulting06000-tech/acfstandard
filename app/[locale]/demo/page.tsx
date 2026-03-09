'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import { useTranslations } from 'next-intl'

export default function HomeDemo() {
  const t = useTranslations()
  
  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      background: '#050c1a',
      color: '#fff',
      minHeight: '100vh'
    }}>
      <Navigation />
      <Hero />
      
      {/* Principles Section */}
      <section style={{
        padding: '100px 0',
        background: '#071122'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px'
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            color: '#c9a84c',
            letterSpacing: '.12em',
            fontWeight: 700
          }}>
            {t('principles.badge')}
          </span>
          
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 800,
            margin: '16px 0 12px',
            letterSpacing: '-.02em'
          }}>
            {t('principles.title')}
          </h2>
          
          <div style={{
            width: '80px',
            height: '3px',
            background: 'linear-gradient(90deg, #c9a84c 0%, transparent 100%)',
            marginBottom: '20px'
          }} />
          
          <p style={{
            fontSize: '16px',
            color: '#9db0c8',
            maxWidth: '700px',
            marginBottom: '60px'
          }}>
            {t('principles.subtitle')}
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{
                background: '#0d1f3c',
                border: '1px solid rgba(201,168,76,.2)',
                borderRadius: '12px',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '72px',
                  fontWeight: 900,
                  color: 'rgba(201,168,76,.08)',
                  lineHeight: 1
                }}>
                  {t(`principles.principle${i}.number`)}
                </div>
                
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  color: '#c9a84c',
                  letterSpacing: '.12em',
                  marginBottom: '12px',
                  fontWeight: 700
                }}>
                  PRINCIPE_{t(`principles.principle${i}.number`)}
                </div>
                
                <h3 style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '12px',
                  color: '#fff',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {t(`principles.principle${i}.title`)}
                </h3>
                
                <p style={{
                  fontSize: '14px',
                  color: '#9db0c8',
                  lineHeight: 1.7,
                  position: 'relative',
                  zIndex: 1
                }}>
                  {t(`principles.principle${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        textAlign: 'center',
        background: '#0d1f3c',
        borderTop: '1px solid rgba(201,168,76,.2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          fontSize: '160px',
          fontWeight: 900,
          color: 'rgba(201,168,76,.025)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Space Grotesk, sans-serif',
          pointerEvents: 'none'
        }}>
          {t('cta.watermark')}
        </div>
        
        <div style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 32px'
        }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            color: '#c9a84c',
            letterSpacing: '.12em',
            fontWeight: 700,
            display: 'block',
            marginBottom: '20px'
          }}>
            {t('cta.badge')}
          </span>
          
          <h2 
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(28px, 4vw, 52px)',
              fontWeight: 800,
              marginBottom: '18px',
              letterSpacing: '-.02em'
            }}
            dangerouslySetInnerHTML={{__html: t('cta.title')}}
          />
          
          <p style={{
            fontSize: '17px',
            color: '#9db0c8',
            marginBottom: '40px',
            lineHeight: 1.75
          }}>
            {t('cta.description')}
          </p>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <a href="/contact" style={{
              background: '#c9a84c',
              color: '#050c1a',
              padding: '16px 32px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              transition: '.2s'
            }}>
              {t('cta.primary')}
            </a>
            
            <a href="/partners/apply" style={{
              background: 'transparent',
              border: '2px solid rgba(201,168,76,.3)',
              color: '#c9a84c',
              padding: '16px 32px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              textDecoration: 'none',
              transition: '.2s'
            }}>
              {t('cta.secondary')}
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer style={{
        background: '#071122',
        borderTop: '1px solid rgba(201,168,76,.2)',
        padding: '50px 0 28px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '56px',
            marginBottom: '56px'
          }}>
            <div>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700,
                fontSize: '14px',
                marginBottom: '4px'
              }}>
                {t('footer.logoText')}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#c9a84c',
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}>
                {t('footer.logoSubtext')}
              </div>
              <p style={{
                color: '#6b7fa0',
                fontSize: '14px',
                lineHeight: 1.75,
                maxWidth: '270px'
              }}>
                {t('footer.description')}
              </p>
            </div>
            
            <div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                marginBottom: '18px'
              }}>
                {t('footer.framework.title')}
              </div>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '10px'}}>
                  <a href="/standard" style={{color: '#6b7fa0', fontSize: '14px', textDecoration: 'none'}}>
                    {t('footer.framework.theStandard')}
                  </a>
                </li>
                <li style={{marginBottom: '10px'}}>
                  <a href="/method" style={{color: '#6b7fa0', fontSize: '14px', textDecoration: 'none'}}>
                    {t('footer.framework.methodology')}
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                marginBottom: '18px'
              }}>
                {t('footer.products.title')}
              </div>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '10px'}}>
                  <a href="https://acf-score.com" style={{color: '#6b7fa0', fontSize: '14px', textDecoration: 'none'}}>
                    {t('footer.products.score')}
                  </a>
                </li>
                <li style={{marginBottom: '10px'}}>
                  <a href="/control" style={{color: '#6b7fa0', fontSize: '14px', textDecoration: 'none'}}>
                    {t('footer.products.control')}
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                marginBottom: '18px'
              }}>
                {t('footer.organization.title')}
              </div>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '10px'}}>
                  <a href="/about" style={{color: '#6b7fa0', fontSize: '14px', textDecoration: 'none'}}>
                    {t('footer.organization.about')}
                  </a>
                </li>
                <li style={{marginBottom: '10px'}}>
                  <a href="/contact" style={{color: '#6b7fa0', fontSize: '14px', textDecoration: 'none'}}>
                    {t('footer.organization.contact')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid rgba(255,255,255,.07)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6b7fa0',
              fontFamily: 'JetBrains Mono, monospace'
            }}>
              {t('footer.copyright')}
            </div>
            
            <div style={{display: 'flex', gap: '20px'}}>
              <a href="/privacy" style={{fontSize: '12px', color: '#6b7fa0', textDecoration: 'none'}}>
                {t('footer.legal.privacy')}
              </a>
              <a href="/terms" style={{fontSize: '12px', color: '#6b7fa0', textDecoration: 'none'}}>
                {t('footer.legal.terms')}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
