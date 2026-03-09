'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function Hero() {
  const t = useTranslations('hero')
  const params = useParams()
  const locale = params.locale as string
  
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: '#050c1a',
      paddingTop: '72px',
      position: 'relative'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '80px 32px 60px',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            fontSize: 'clamp(36px, 5vw, 68px)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '28px',
            color: '#fff'
          }}>
            <span style={{color: '#9db0c8'}}>{t('title')}</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {t('typing.word1')}
            </span>
          </h1>
          
          <p style={{
            fontSize: '17px',
            color: '#9db0c8',
            lineHeight: 1.75,
            marginBottom: '40px'
          }}>
            {t('description')}
          </p>
          
          <div style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            marginBottom: '48px'
          }}>
            <Link href={`/${locale}/contact`} style={{
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
            </Link>
            
            <Link href={`/${locale}/standard`} style={{
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
            </Link>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'rgba(201,168,76,.2)'
          }}>
            <div style={{background: '#071122', padding: '20px', textAlign: 'center'}}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '32px',
                fontWeight: 800,
                color: '#c9a84c',
                marginBottom: '4px'
              }}>
                {t('stats.principles.value')}
              </div>
              <div 
                style={{fontSize: '11px', color: '#6b7fa0', fontWeight: 600}}
                dangerouslySetInnerHTML={{__html: t('stats.principles.label')}}
              />
            </div>
            
            <div style={{background: '#071122', padding: '20px', textAlign: 'center'}}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '32px',
                fontWeight: 800,
                color: '#c9a84c',
                marginBottom: '4px'
              }}>
                {t('stats.modules.value')}
              </div>
              <div 
                style={{fontSize: '11px', color: '#6b7fa0', fontWeight: 600}}
                dangerouslySetInnerHTML={{__html: t('stats.modules.label')}}
              />
            </div>
            
            <div style={{background: '#071122', padding: '20px', textAlign: 'center'}}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '32px',
                fontWeight: 800,
                color: '#c9a84c',
                marginBottom: '4px'
              }}>
                {t('stats.kpis.value')}
              </div>
              <div 
                style={{fontSize: '11px', color: '#6b7fa0', fontWeight: 600}}
                dangerouslySetInnerHTML={{__html: t('stats.kpis.label')}}
              />
            </div>
            
            <div style={{background: '#071122', padding: '20px', textAlign: 'center'}}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '32px',
                fontWeight: 800,
                color: '#c9a84c',
                marginBottom: '4px'
              }}>
                {t('stats.tools.value')}
              </div>
              <div 
                style={{fontSize: '11px', color: '#6b7fa0', fontWeight: 600}}
                dangerouslySetInnerHTML={{__html: t('stats.tools.label')}}
              />
            </div>
          </div>
        </div>
        
        <div style={{
          position: 'relative',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(201,168,76,.15) 0%, rgba(201,168,76,.05) 100%)',
            border: '2px solid rgba(201,168,76,.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            position: 'relative'
          }}>
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '42px',
              fontWeight: 900,
              color: '#c9a84c',
              marginBottom: '8px'
            }}>ACF®</div>
            <div style={{
              fontSize: '14px',
              color: '#9db0c8',
              fontWeight: 600
            }}>Standard</div>
            
            <div style={{
              position: 'absolute',
              top: '10%',
              right: '-20%',
              background: '#071122',
              border: '1px solid rgba(201,168,76,.2)',
              borderRadius: '12px',
              padding: '16px 20px',
              minWidth: '180px'
            }}>
              <div style={{fontSize: '13px', fontWeight: 700, color: '#c9a84c', marginBottom: '4px'}}>
                {t('satellites.score.name')}
              </div>
              <div style={{fontSize: '11px', color: '#6b7fa0'}}>
                {t('satellites.score.description')}
              </div>
            </div>
            
            <div style={{
              position: 'absolute',
              bottom: '10%',
              right: '-20%',
              background: '#071122',
              border: '1px solid rgba(201,168,76,.2)',
              borderRadius: '12px',
              padding: '16px 20px',
              minWidth: '180px'
            }}>
              <div style={{fontSize: '13px', fontWeight: 700, color: '#c9a84c', marginBottom: '4px'}}>
                {t('satellites.control.name')}
              </div>
              <div style={{fontSize: '11px', color: '#6b7fa0'}}>
                {t('satellites.control.description')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
