'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import { useTranslations } from 'next-intl'

export default function HomeDemo() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navigation />
      <Hero />
      
      {/* Principles Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Principle 1 */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute -top-4 left-8 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-xs font-semibold tracking-wider">
                {t('principles.principle01.label')}
              </div>
              <div className="absolute top-8 right-8 text-8xl font-bold text-slate-800/20 group-hover:text-blue-500/10 transition-colors">
                01
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4 relative z-10">{t('principles.principle01.title')}</h3>
              <p className="text-slate-400 relative z-10">{t('principles.principle01.description')}</p>
            </div>

            {/* Principle 2 */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute -top-4 left-8 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-xs font-semibold tracking-wider">
                {t('principles.principle02.label')}
              </div>
              <div className="absolute top-8 right-8 text-8xl font-bold text-slate-800/20 group-hover:text-blue-500/10 transition-colors">
                02
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4 relative z-10">{t('principles.principle02.title')}</h3>
              <p className="text-slate-400 relative z-10">{t('principles.principle02.description')}</p>
            </div>

            {/* Principle 3 */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute -top-4 left-8 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-xs font-semibold tracking-wider">
                {t('principles.principle03.label')}
              </div>
              <div className="absolute top-8 right-8 text-8xl font-bold text-slate-800/20 group-hover:text-blue-500/10 transition-colors">
                03
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4 relative z-10">{t('principles.principle03.title')}</h3>
              <p className="text-slate-400 relative z-10">{t('principles.principle03.description')}</p>
            </div>

            {/* Principle 4 */}
            <div className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute -top-4 left-8 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-xs font-semibold tracking-wider">
                {t('principles.principle04.label')}
              </div>
              <div className="absolute top-8 right-8 text-8xl font-bold text-slate-800/20 group-hover:text-blue-500/10 transition-colors">
                04
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4 relative z-10">{t('principles.principle04.title')}</h3>
              <p className="text-slate-400 relative z-10">{t('principles.principle04.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-xl mb-8 text-blue-100">{t('cta.description')}</p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
              {t('cta.button')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">{t('footer.company.title')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.about')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.careers')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.company.contact')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t('footer.products.title')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.products.score')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.products.control')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.products.certification')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t('footer.resources.title')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.resources.docs')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.resources.blog')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.resources.support')}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">{t('footer.legal.title')}</h3>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.legal.privacy')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.legal.terms')}</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">{t('footer.legal.cookies')}</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-8 text-center text-slate-400">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
