import 'react-lazy-load-image-component/src/effects/blur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, Fragment, useEffect } from 'react';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from './ProjectCard';

const projects = [
    {
        id: 1,
        name: 'Pedro Profile',
        description: 'My profile website to show my professional and personal experience',
        thumbnail: `${process.env.PUBLIC_URL}/images/projects/pedro-profile.png`,
        techStack: ['React', 'JavaScript', 'TailwindCSS', 'CSS', 'HTML'],
        link: 'https://pedro-fajardo.github.io/pedro-profile-website/',
        github: 'https://github.com/pedro-fajardo/pedro-profile-website'
    },
    {
        id: 2,
        name: 'Travel Consultant Website',
        description: 'Site for a travel consultant to showcase their services and allow users to contact them',
        thumbnail: `${process.env.PUBLIC_URL}/images/projects/travelconsultant.png`,
        techStack: ['React', 'JavaScript', 'TailwindCSS', 'CSS', 'HTML', 'EmailJS', 'Firebase'],
        link: 'https://silvanagarcia.pt',
        github: null, // repository is private -> show "Ask me for a quote" button
        privateRepo: true
    },
    {
        id: 3,
        name: 'Weather App',
        description: 'Weather app that provides a 5-day forecast, temperature map and temperature evolution graph for the desired city',
        thumbnail: `${process.env.PUBLIC_URL}/images/projects/weather-app.png`,
        techStack: ['React', 'TypeScript', 'CSS', 'HTML'],
        link: 'https://pedro-fajardo.github.io/weather-app/',
        github: 'https://github.com/pedro-fajardo/weather-app'
    },
    {
        id: 4,
        name: 'Equipment Repair Management App',
        description: 'App for management of equipments that come for repair to an appliance store',
        thumbnail: `${process.env.PUBLIC_URL}/images/projects/jomafal-app.png`,
        techStack: ['React', 'JavaScript', 'TailwindCSS', 'CSS', 'HTML', 'Django Rest Framework'],
    },
];

const ProjectList = () => {
    const [itemsPerPage, setItemsPerPage] = useState(typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768);
    const [activeIndex, setActiveIndex] = useState(0);
    const carouselRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startScroll = useRef(0);
    const gap = 30; // must match project's spacing

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            setItemsPerPage(mobile ? 1 : 3);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Drag handlers (mouse & pointer)
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        const onPointerDown = (e) => {
            isDragging.current = true;
            startX.current = e.clientX ?? e.touches?.[0]?.clientX;
            startScroll.current = el.scrollLeft;
            el.style.scrollBehavior = 'auto';
        };
        const onPointerMove = (e) => {
            if (!isDragging.current) return;
            const x = e.clientX ?? e.touches?.[0]?.clientX;
            const delta = x - startX.current;
            el.scrollLeft = startScroll.current - delta;
            updateActiveIndex();
        };
        const onPointerUp = () => {
            if (!isDragging.current) return;
            isDragging.current = false;
            el.style.scrollBehavior = '';
            snapToNearest();
        };

        // pointer events if available, otherwise fallback to mouse/touch
        el.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        // touch fallback
        el.addEventListener('touchstart', onPointerDown, { passive: true });
        el.addEventListener('touchmove', onPointerMove, { passive: true });
        el.addEventListener('touchend', onPointerUp);

        return () => {
            el.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            el.removeEventListener('touchstart', onPointerDown);
            el.removeEventListener('touchmove', onPointerMove);
            el.removeEventListener('touchend', onPointerUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsPerPage]);

    const getItemWidth = () => {
        const el = carouselRef.current;
        if (!el) return 0;
        const first = el.querySelector('.project-item');
        if (!first) return el.clientWidth / itemsPerPage;
        const rect = first.getBoundingClientRect();
        return rect.width + gap;
    };

    const updateActiveIndex = () => {
        const el = carouselRef.current;
        if (!el) return;
        const itemW = getItemWidth() || 1;
        const idx = Math.round(el.scrollLeft / itemW);
        setActiveIndex(Math.max(0, Math.min(projects.length - 1, idx)));
    };

    const snapToNearest = () => {
        const el = carouselRef.current;
        if (!el) return;
        const itemW = getItemWidth();
        const idx = Math.round(el.scrollLeft / itemW);
        const target = idx * itemW;
        el.scrollTo({ left: target, behavior: 'smooth' });
        setActiveIndex(idx);
    };

    const scrollNext = () => {
        const el = carouselRef.current;
        if (!el) return;
        // scroll by container width (one page)
        const amount = el.clientWidth - 40;
        el.scrollBy({ left: amount, behavior: 'smooth' });
        setTimeout(updateActiveIndex, 300);
    };

    const scrollPrev = () => {
        const el = carouselRef.current;
        if (!el) return;
        const amount = el.clientWidth - 40;
        el.scrollBy({ left: -amount, behavior: 'smooth' });
        setTimeout(updateActiveIndex, 300);
    };

    return (
        <section className="pt-12 md:pt-24 bg-zinc-800 font-sourceCode relative overflow-visible">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-4xl font-semibold mb-8 md:mb-16 text-center text-zinc-300">
                    Some of the projects I've developed
                </h2>
                <div className="relative">
                    {/* hide native scrollbar and allow smooth dragging */}
                    <style>{`
                        .carousel {
                            overflow-x: auto;
                            -webkit-overflow-scrolling: touch;
                            scroll-behavior: smooth;
                        }
                        .carousel {
                            scrollbar-width: none;
                            -ms-overflow-style: none;
                        }
                        .carousel::-webkit-scrollbar {
                            display: none;
                            width: 0;
                            height: 0;
                        }
                    `}</style>

                    <div
                        ref={carouselRef}
                        className="carousel flex gap-7 py-4 px-1 items-stretch"
                        onScroll={() => updateActiveIndex()}
                    >
                        {projects.map((project, index) => (
                            <div
                                key={project.id}
                                className="project-item flex-shrink-0"
                                style={{
                                    width: isMobile ? '90%' : `calc((100% - ${((itemsPerPage - 1) * gap)}px) / ${itemsPerPage})`
                                }}
                            >
                                <ProjectCard
                                    project={project}
                                    isActive={index === activeIndex}
                                    index={index}
                                    activeIndex={activeIndex}
                                />
                            </div>
                        ))}
                    </div>

                    {!isMobile && (
                        <Fragment>
                            <div
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-20 z-10 w-10 h-10 flex items-center justify-center bg-zinc-700/50 rounded-full hover:bg-zinc-700/80 transition-colors cursor-pointer"
                                onClick={scrollPrev}
                            >
                                <FontAwesomeIcon
                                    icon={faChevronLeft}
                                    className="text-zinc-400 text-xl hover:text-zinc-200 transition-colors"
                                />
                            </div>
                            <div
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-20 z-10 w-10 h-10 flex items-center justify-center bg-zinc-700/50 rounded-full hover:bg-zinc-700/80 transition-colors cursor-pointer"
                                onClick={scrollNext}
                            >
                                <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="text-zinc-400 text-xl hover:text-zinc-200 transition-colors"
                                />
                            </div>
                        </Fragment>
                    )}

                    {isMobile && (
                        <p className="text-center text-zinc-400 mt-4 text-sm">
                            Swipe to see more projects
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProjectList;