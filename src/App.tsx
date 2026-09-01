import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, MessageCircle, MapPin, ChevronRight, Menu, X, Car, Droplets, Wrench, ArrowUp, ArrowUpDown, CheckCircle2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import BeforeAfterSlider from './components/BeforeAfterSlider';

// Utility for Tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Data
const SERVICES = [
  {
    id: 'lavagem',
    title: 'Lavagem Detalhada',
    description: 'Muito além de água e sabão. Limpeza profunda de cada fresta, rodas, caixas de roda e descontaminação de pintura.',
    icon: Droplets,
  },
  {
    id: 'polimento',
    title: 'Polimento Técnico',
    description: 'Correção de verniz, remoção de riscos e restauração do brilho original com maquinário de alta precisão.',
    icon: Sparkles,
  },
  {
    id: 'detalhamento',
    title: 'Detalhamento Interno',
    description: 'Higienização de estofados, painéis e cantos inacessíveis, trazendo o aspecto de carro zero quilômetro.',
    icon: Wrench,
  },
  {
    id: 'protecao',
    title: 'Vitrificação & Proteção',
    description: 'Aplicação de coatings cerâmicos para garantir proteção prolongada e brilho espelhado que dura anos.',
    icon: Car,
  }
];

const GALLERY = [
  { id: 1, url: 'fotos/camaro.webp', fallback: 'https://images.pexels.com/photos/32447521/pexels-photo-32447521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'VW Scirocco Teal' },
  { id: 2, url: 'fotos/golf.webp', fallback: 'https://images.pexels.com/photos/9783487/pexels-photo-9783487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Fiat Uno Red' },
  { id: 3, url: 'fotos/azulfuria.webp', fallback: 'https://images.pexels.com/photos/11756442/pexels-photo-11756442.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Chevrolet Camaro Red' },
  { id: 4, url: 'fotos/passat2.webp', fallback: 'https://images.pexels.com/photos/15230585/pexels-photo-15230585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'VW Golf Blue' },
];

const TRANSFORMATIONS = [
  {
    id: 1,
    title: 'Camaro Vermelho',
    service: 'Polimento Completo',
    beforeSrc: 'fotos/camaro.webp',  // Foto do Camaro de antes (ou outra de sua escolha)
    afterSrc: 'fotos/camaro.webp',   // Foto do Camaro finalizado
    description: 'Recuperação profunda da pintura oxidada, devolvendo o brilho vermelho original que estava apagado pelo tempo.',
    steps: ['Descontaminação da pintura', 'Polimento em 3 etapas', 'Selante sintético'],
  },
  {
    id: 2,
    title: 'VW Golf GTI MK6',
    service: 'Lavagem & Detalhamento',
    beforeSrc: 'fotos/passat2.webp', // Foto do Golf cinza/antigo
    afterSrc: 'fotos/golf.webp',     // Foto do Golf azul claro fosco
    description: 'Limpeza minuciosa de cada detalhe, incluindo caixas de roda, emblemas e frestas que uma lavagem comum nunca alcança.',
    steps: ['Pré-lavagem com snow foam', 'Escovas de detalhamento', 'Higienização de rodas'],
  },
  {
    id: 3,
    title: 'VW Golf GTI Black',
    service: 'Vitrificação Cerâmica',
    beforeSrc: 'fotos/azulfuria.webp', // Substitua pelos seus arquivos de antes/depois reais
    afterSrc: 'fotos/azulfuria.webp',
    description: 'Aplicação de coating cerâmico que cria uma barreira protetora permanente, com efeito espelhado e repelência à água.',
    steps: ['Correção da pintura', 'Desengraxante técnico', 'Aplicação do coating 9H'],
  },
];


export default function App() {
  // Configuração para smooth scroll nos links internos
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const WHATSAPP_NUMBER = "5551991865423"; // Replace with real number
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20avalia%C3%A7%C3%A3o%20para%20o%20meu%20ve%C3%ADculo.`;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-red-500/30">
      
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled ? "bg-zinc-950/90 backdrop-blur-md border-zinc-800 py-4" : "bg-transparent py-6"
      )}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="." 
              alt="Detail's Clean Logo" 
              className="h-12 w-auto object-contain hidden md:block"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const span = e.currentTarget.nextElementSibling as HTMLElement;
                if (span) span.style.display = 'block';
              }}
            />
            <span className="text-2xl font-serif tracking-widest text-zinc-100 uppercase drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] md:hidden" style={{ display: 'block' }}>
              Detail's<span className="text-red-500">.</span>Clean
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#filosofia" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Filosofia</a>
            <a href="#servicos" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Serviços</a>
            <a href="#transformacoes" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Transformações</a>
            <a href="#processo" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">O Processo</a>
            <a href="#galeria" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">Galeria</a>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <ArrowUp size={16} />
              Voltar ao Topo
            </button>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-sm text-sm font-medium transition-all flex items-center gap-2"
            >
              <MessageCircle size={16} />
              Agendar Avaliação
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-zinc-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 py-4 px-6 flex flex-col gap-4 md:hidden"
            >
              <a href="#filosofia" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 py-2 border-b border-zinc-800">Filosofia</a>
              <a href="#servicos" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 py-2 border-b border-zinc-800">Serviços</a>
              <a href="#transformacoes" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 py-2 border-b border-zinc-800">Transformações</a>
              <a href="#processo" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 py-2 border-b border-zinc-800">O Processo</a>
              <a href="#galeria" onClick={() => setMobileMenuOpen(false)} className="text-zinc-300 py-2 border-b border-zinc-800">Galeria</a>
              <button 
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}
                className="text-red-500 py-2 flex items-center gap-2 font-medium"
              >
                <ArrowUp size={16} />
                Voltar ao Topo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

     {/* Hero Section */}
      <section className="relative min-h-screen md:h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 md:py-0">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="fotos/camaro.webp" 
            alt="Garage Detailing" 
            className="w-full h-full object-cover object-[35%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-zinc-950 via-zinc-950/90 md:via-zinc-950/80 to-zinc-950/40 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-xs font-medium text-zinc-300 mb-6">
              <Star className="w-3 h-3 text-red-500 fill-red-500" />
              Estética Automotiva Visionária
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif mb-6 leading-[1.2] md:leading-[1.1]">
              A Arte de Cuidar do Seu <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Veículo.</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 mb-8 max-w-lg leading-relaxed">
              Não fazemos apenas lavagem. Fazemos uma avaliação meticulosa para entender o que o seu carro precisa e entregar um resultado impecável. Paixão por cada detalhe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-sm font-medium transition-all text-center flex items-center justify-center gap-2 group w-full sm:w-auto"
              >
                Falar com Especialista
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#servicos" 
                className="border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-800 text-white px-8 py-4 rounded-sm font-medium transition-all text-center backdrop-blur-sm w-full sm:w-auto"
              >
                Conheça os Serviços
              </a>
            </div>
          </motion.div>
        </div>
      </section>


     {/* Philosophy Section - Less is More */}
<section id="filosofia" className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative mb-8 lg:mb-0"
      >
        <div className="absolute -inset-4 bg-zinc-900/50 rounded-2xl transform -rotate-3 hidden sm:block" />
        
        {/* IMAGEM ORIGINAL E COLORIDA */}
        <img 
          src="fotos/ia.webp" 
          alt="Less is More Garage" 
          onError={(e) => { e.currentTarget.src = 'https://pexels.com' }}
          className="relative z-10 rounded-xl shadow-2xl w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
        />
       
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="pt-6 lg:pt-0"
      >
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mb-6 leading-tight">Mais que uma estética, uma comunidade.</h2>
        <div className="space-y-4 sm:space-y-6 text-zinc-400 leading-relaxed text-base sm:text-lg">
          <p>
            Na Detail's Clean, acreditamos que o cuidado automotivo vai muito além de produtos e máquinas. É sobre a <strong className="text-zinc-200">paixão por preservar</strong> a história e a beleza de cada veículo que entra em nossa garagem.
          </p>
          <p>
            Nossa filosofia <em>"Less is More"</em> dita que a perfeição mora nos detalhes sutis. Não entregamos promessas exageradas, entregamos resultados reais, palpáveis e impecáveis. 
          </p>
          <p>
            Somos um grupo de apaixonados por carros. Tratamos o seu veículo com o mesmo nível de exigência e carinho que tratamos os nossos.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-10 sm:grid-cols-2">
          <div className="border-l-2 border-red-600 pl-4">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">+10</div>
            <div className="text-xs sm:text-sm text-zinc-500 uppercase tracking-wider">Anos de Experiência</div>
          </div>
          <div className="border-l-2 border-red-600 pl-4">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">100%</div>
            <div className="text-xs sm:text-sm text-zinc-500 uppercase tracking-wider">Paixão no detalhe</div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
</section>



      {/* Services Section */}
      <section id="servicos" className="py-16 md:py-24 bg-zinc-900 border-y border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl font-serif mb-4 md:mb-6"
            >
              Serviços Especializados
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-base sm:text-lg"
            >
              Cada carro é único. Por isso, oferecemos um leque de serviços que podem ser personalizados após nossa avaliação técnica.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 hover:border-red-500/50 transition-colors group rounded-sm"
                >
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm flex items-center justify-center mb-6 group-hover:bg-red-950/30 group-hover:border-red-900/50 transition-colors">
                    <Icon className="w-6 h-6 text-zinc-400 group-hover:text-red-500 transition-colors" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

{/* Before/After Transformations Section */}
      <section id="transformacoes" className="py-16 md:py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 border-y border-zinc-800 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs font-medium text-zinc-300 mb-6"
            >
              <ArrowUpDown className="w-3 h-3 text-red-500" />
              Arraste o slider para comparar
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-5xl font-serif mb-4 md:mb-6"
            >
              Resultados <span className="text-red-500">Reais</span>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-base sm:text-lg"
            >
              Arraste o slider e veja a diferença que o cuidado meticuloso da Detail's Clean faz no seu veículo.
            </motion.p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {TRANSFORMATIONS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 md:gap-8 items-center bg-zinc-900/30 border border-zinc-800 rounded-xl p-4 sm:p-6 lg:p-8 hover:border-red-900/50 transition-colors"
              >
                <div className="w-full overflow-hidden rounded-lg">
                  <BeforeAfterSlider
                    beforeSrc={item.beforeSrc}
                    afterSrc={item.afterSrc}
                    alt={item.title}
                    beforeLabel="ANTES"
                    afterLabel="DEPOIS"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div>
                    <span className="inline-block text-[10px] font-bold tracking-[0.25em] text-red-500 uppercase bg-red-950/30 border border-red-900/30 px-3 py-1 rounded-sm mb-3 md:mb-4">
                      {item.service}
                    </span>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif text-white mb-3 md:mb-4">{item.title}</h3>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                  <div className="space-y-2.5 border-t border-zinc-800/60 pt-4 lg:pt-0 lg:border-t-0">
                    <p className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
                      O que foi feito:
                    </p>
                    <ul className="space-y-2">
                      {item.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center px-4">
            <p className="text-zinc-500 text-sm mb-4 md:mb-6">
              Quer ver essa transformação no seu veículo?
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-sm font-medium transition-all items-center justify-center gap-2 group w-full sm:w-auto text-sm sm:text-base shadow-lg"
            >
              <MessageCircle size={18} />
              <span>Agendar uma Avaliação</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>


     {/* The Process Section */}
      <section id="processo" className="py-16 md:py-24 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'#ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mb-4 md:mb-6">Nosso Cuidado Começa na Avaliação.</h2>
              <p className="text-zinc-400 text-base sm:text-lg mb-8 max-w-xl">
                Não vendemos pacotes prontos sem antes entender a real necessidade do seu veículo. Acreditamos que o tratamento adequado exige diagnóstico preciso.
              </p>

              <div className="space-y-4 md:space-y-6">
                {[
                  { title: 'Agendamento Prévio', desc: 'Entramos em contato para entender sua rotina e agendar o melhor momento para receber seu veículo.' },
                  { title: 'Avaliação Técnica (Ouvir e Ver)', desc: 'Analisamos a pintura, interior e detalhes. Conversamos para entender o que te incomoda no carro atualmente.' },
                  { title: 'Plano de Ação Personalizado', desc: 'Sugerimos apenas os serviços que realmente farão a diferença e trarão o resultado impecável que buscamos.' },
                  { title: 'Execução com Maestria', desc: 'Mão na massa com os melhores produtos do mercado, iluminação adequada e paciência para cada detalhe.' }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-red-950/30 border border-red-900/50 flex items-center justify-center text-red-500 font-bold text-sm shrink-0">
                        {idx + 1}
                      </div>
                      {idx !== 3 && <div className="w-px h-full bg-zinc-800 my-2" />}
                    </div>
                    <div className="pb-2 md:pb-4">
                      <h4 className="text-white font-medium text-base sm:text-lg">{step.title}</h4>
                      <p className="text-zinc-500 text-sm mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative h-[350px] sm:h-[450px] lg:h-[600px] w-full rounded-xl overflow-hidden border border-zinc-800 mt-6 lg:mt-0"
            >
               <video
                src="fotos/gravação.mp4"
                poster="https://images.pexels.com/videos/6872478/pexels-photo-6872478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=630"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Processo de Avaliação e Polimento"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>


    {/* Gallery Section */}
      <section id="galeria" className="py-16 md:py-24 bg-zinc-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif mb-4">Resultados Impecáveis</h2>
            <p className="text-zinc-400 text-base sm:text-lg">Um pouco do nosso portfólio de obras de arte automobilísticas.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative group overflow-hidden bg-zinc-800 rounded-sm aspect-[4/3] w-full"
              >
                <img 
                  src={img.url} 
                  onError={(e) => { e.currentTarget.src = img.fallback; }}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-serif text-base sm:text-lg tracking-wider border border-white/30 px-6 py-2 backdrop-blur-sm">
                    Ver Detalhes
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 md:mt-12 text-center">
             <a 
                href="https://www.instagram.com/detailsclean/" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-zinc-300 hover:text-white border-b border-zinc-700 hover:border-red-500 pb-1 transition-all text-sm sm:text-base"
              >
                Veja mais no nosso Instagram
              </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 pt-16 md:pt-20 pb-10 border-t border-zinc-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16">
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="mb-4 md:mb-6">
                <img 
                  src="/images/logo.png" 
                  alt="Detail's Clean Logo" 
                  className="h-14 md:h-16 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const span = e.currentTarget.nextElementSibling as HTMLElement;
                    if (span) span.style.display = 'block';
                  }}
                />
                <span className="text-xl sm:text-2xl font-serif tracking-widest text-zinc-100 uppercase drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] hidden">
                  Detail's<span className="text-red-500">.</span>Clean
                </span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                Estética automotiva visionária. Cuidamos do seu carro com a paixão e a precisão que ele merece. Less is More.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-white font-medium mb-4 md:mb-6 uppercase tracking-wider text-xs sm:text-sm border-b border-red-600/30 pb-1 w-fit">Contato</h4>
              <ul className="space-y-3 sm:space-y-4 text-zinc-400 text-sm">
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <MapPin size={16} className="text-red-500 shrink-0" />
                  <span>R. Fernão de Magalhães, 297 - Bom Sucesso, Gravataí - RS, 94130-200</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <MessageCircle size={16} className="text-red-500 shrink-0" />
                  <span>+55 (51) 99186-5423</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-red-500 font-bold shrink-0">@</span>
                  <span>@detailsclean</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <h4 className="text-white font-medium mb-4 md:mb-6 uppercase tracking-wider text-xs sm:text-sm border-b border-red-600/30 pb-1 w-fit">Pronto para a perfeição?</h4>
              <p className="text-zinc-500 text-sm mb-6 max-w-sm">
                Agende uma avaliação e descubra o verdadeiro potencial do seu veículo.
              </p>
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex bg-red-600 hover:bg-red-700 text-white px-6 py-3.5 rounded-sm text-sm font-medium transition-all items-center gap-2 w-full max-w-md justify-center shadow-lg"
              >
                <MessageCircle size={18} />
                Agendar via WhatsApp
              </a>
            </div>
          </div>
          
          <div className="border-t border-zinc-900 pt-8 text-center text-zinc-600 text-xs sm:text-sm">
            <p>&copy; {new Date().getFullYear()} Detail's Clean. Estética Automotiva. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] hover:scale-110 transition-all z-50 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={28} />
      </motion.a>
    </div>
  );
}
