'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTourController } from './useTourController';
import { X, ExternalLink, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLenis } from '../SmoothScroll';

/**
 * Content viewer modal for displaying PDFs, images, videos, and code
 * Opens within the tour overlay without leaving cinematic mode
 */
export function ContentViewerModal() {
    const { isViewerOpen, viewerContent, closeViewer, isReducedMotion } = useTourController();
    const [imageZoom, setImageZoom] = useState(1);
    const lenis = useLenis();

    // Lock scroll when viewer is open
    useEffect(() => {
        if (!lenis) return;

        if (isViewerOpen) {
            lenis.stop();
        } else {
            lenis.start();
        }

        return () => {
            lenis.start();
        };
    }, [lenis, isViewerOpen]);

    if (!isViewerOpen || !viewerContent) return null;

    const renderContent = () => {
        switch (viewerContent.type) {
            case 'pdf':
                return (
                    <div className="w-full h-full">
                        <iframe
                            src={viewerContent.src}
                            className="w-full h-full rounded-lg"
                            title={viewerContent.title ?? 'PDF Document'}
                            style={{ background: 'white' }}
                        />
                    </div>
                );

            case 'image':
                return (
                    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                        <motion.img
                            src={viewerContent.src}
                            alt={viewerContent.title ?? 'Image'}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            style={{ transform: `scale(${imageZoom})` }}
                            transition={{ duration: 0.2 }}
                            draggable={false}
                        />

                        {/* Zoom controls for images */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
                            <button
                                onClick={() => setImageZoom(z => Math.max(0.5, z - 0.25))}
                                className="p-1 text-white/70 hover:text-white transition-colors"
                                aria-label="Zoom out"
                            >
                                <ZoomOut size={16} />
                            </button>
                            <span className="text-xs text-white/50 font-mono w-12 text-center">
                                {Math.round(imageZoom * 100)}%
                            </span>
                            <button
                                onClick={() => setImageZoom(z => Math.min(3, z + 0.25))}
                                className="p-1 text-white/70 hover:text-white transition-colors"
                                aria-label="Zoom in"
                            >
                                <ZoomIn size={16} />
                            </button>
                        </div>
                    </div>
                );

            case 'video':
                return (
                    <div className="w-full h-full flex items-center justify-center">
                        <video
                            src={viewerContent.src}
                            controls
                            className="max-w-full max-h-full rounded-lg"
                            autoPlay
                        >
                            Your browser does not support video playback.
                        </video>
                    </div>
                );

            case 'code':
                return (
                    <div className="w-full h-full overflow-auto">
                        <pre className="p-6 text-sm font-mono text-gray-300 bg-gray-900 rounded-lg overflow-auto h-full">
                            <code className={`language-${viewerContent.language ?? 'plaintext'}`}>
                                {viewerContent.src}
                            </code>
                        </pre>
                    </div>
                );

            default:
                return (
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Unsupported content type
                    </div>
                );
        }
    };

    return (
        <AnimatePresence>
            {isViewerOpen && (
                <motion.div
                    className="fixed inset-0 z-[10003] flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: isReducedMotion ? 0.1 : 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={closeViewer}
                    />

                    {/* Modal container */}
                    <motion.div
                        className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.98) 0%, rgba(25, 25, 35, 0.98) 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        }}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{
                            duration: isReducedMotion ? 0.1 : 0.3,
                            type: isReducedMotion ? 'tween' : 'spring',
                            stiffness: 300,
                            damping: 25
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <span className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <h3 className="text-sm font-medium text-white/80 truncate max-w-md">
                                    {viewerContent.title ?? 'Content Viewer'}
                                </h3>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* External link for PDFs */}
                                {viewerContent.type === 'pdf' && (
                                    <a
                                        href={viewerContent.src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        aria-label="Open in new tab"
                                    >
                                        <ExternalLink size={16} />
                                    </a>
                                )}

                                {/* Download for images */}
                                {viewerContent.type === 'image' && (
                                    <a
                                        href={viewerContent.src}
                                        download
                                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                        aria-label="Download"
                                    >
                                        <Download size={16} />
                                    </a>
                                )}

                                {/* Close button */}
                                <button
                                    onClick={closeViewer}
                                    className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    aria-label="Close viewer"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Content area */}
                        <div className="p-6 h-[calc(100%-60px)]">
                            {renderContent()}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
