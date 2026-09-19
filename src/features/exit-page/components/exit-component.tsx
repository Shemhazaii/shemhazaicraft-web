"use client";
import React, {useState, useEffect, SetStateAction} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Download,
    Sparkles,
    AlertTriangle,
    ExternalLink,
    MessageSquare,
    Flag,
    FileArchive,
    HelpCircle,
    RefreshCw,
    CheckCircle2,
    ChevronDown,
    Monitor,
    Box,
    Tag,
    ShieldAlert,
    Clock,
    Layers,
    Terminal
} from 'lucide-react';
import {ModpackCardProps} from "@/features/landing-page/types";
import {capitalizeFirstLetter} from "@/lib/utils";

interface ExitPageProps {
    link: String |any;
    OS: String |any;
}

export default function ExitComponent(data: ExitPageProps) {
    const [initialTime, setInitialTime] = useState(5);
    const [timeLeft, setTimeLeft] = useState(5);
    const [isReady, setIsReady] = useState(false);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let timer: string | number | NodeJS.Timeout | undefined;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsReady(true);
            setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const parsedUrl = new URL(data.link);


    const hostname = parsedUrl.hostname;


    const domainParts = hostname.replace('www.', '').split('.');
    const appName = capitalizeFirstLetter(domainParts[0]); // Hasil: "discord"

    const progressPercentage = Math.min(
        100,
        Math.max(0, ((initialTime - timeLeft) / initialTime) * 100)
    );

    const troubleGuides = [
        {
            id: 'extract',
            icon: <FileArchive className="w-4 h-4 text-purple-400" />,
            title: 'Extracting ZIP, RAR and 7z archives',
            summary: 'Most files are compressed. Learn how to extract them properly without corrupting game files.',
            content: 'We recommend using 7-Zip (Windows) or Keka (macOS). Avoid default Windows extractor for multipart RAR files. Always right-click and choose "Extract to [folder name]" to avoid scattered files.'
        }
    ];

    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden flex flex-col justify-between">

            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-linear-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none -z-10" />

            <main className="max-w-4xl mx-auto w-full px-4 py-8 md:py-12 grow flex flex-col items-center">

                <div className="text-center w-full mb-8">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl md:text-3xl font-extrabold tracking-tight  mb-4"
                    >
                        Preparing your link
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium"
                    >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 border border-accent/80 shadow-sm">
              <Monitor className="w-3.5 h-3.5 text-blue-400 text" />
                {data.OS}
            </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 border border-accent/80 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              from <strong className="font-semibold">{appName}</strong>
            </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 border border-accent/80 shadow-sm">
              <Tag className="w-3.5 h-3.5 text-purple-400" />
              v1.0.0
            </span>
                    </motion.div>
                </div>

                {}
                <section className="w-full max-w-2xl bg-background/60 border border-accent rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-2xl mb-8 relative overflow-hidden">
                    <div className="relative mb-4">
                        <div className="h-3 w-full bg-background/90 rounded-full overflow-hidden p-0.5 border-2 border-accent/80">
                            <motion.div
                                className="h-full bg-linear-to-r from-primary via-emerald-700 to-white rounded-full transition-all duration-300 ease-out shadow-lg shadow-blue-500/30"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    </div>

                    {/* Countdown Text or Download Action */}
                    <div className="text-center min-h-18 flex flex-col items-center justify-center">
                        {!isReady ? (
                            <motion.div
                                key="countdown"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-1"
                            >
                                <p className="text-neutral-400 text-sm md:text-base flex items-center justify-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-400 animate-spin" style={{ animationDuration: '3s' }} />
                                    Your link will be ready in <span className="font-bold text-white text-lg min-w-5 inline-block">{timeLeft}s</span>
                                </p>
                                <p className="text-xs text-neutral-500">Please wait a few moments while we verify the link...</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="download-btn"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="w-full space-y-3"
                            >
                                <button
                                    onClick={() => {
                                        window.location.href = data.link;
                                    }}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-primary via-emerald-700 to-emerald-300 hover:from-primary hover:to-white  font-bold rounded-xl shadow-xl shadow-primary/25 hover:shadow-primary/40 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-3 mx-auto text-base group text-white"
                                >

                                    <span>Continue to {appName}</span>

                                </button>
                                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Link verified & malware clean
                                </div>
                            </motion.div>
                        )}
                    </div>
                </section>

                {}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full max-w-3xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 md:p-5 mb-8 shadow-sm dark:shadow-lg dark:shadow-amber-950/10 relative overflow-hidden group"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-600 dark:bg-amber-500" />
                    <div className="flex gap-3.5 items-start">
                        <div className="p-2 bg-amber-500/15 dark:bg-amber-500/10 rounded-lg border border-amber-600/30 dark:border-amber-500/20 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5">
                            <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div className="space-y-1.5 text-xs md:text-sm text-amber-950/80 dark:text-amber-200/90 leading-relaxed">
                            <p className="font-medium text-amber-900 dark:text-amber-300">
                                There are pop ads on this page. Report on{' '}
                                <a
                                    href="#discord"
                                    className="underline decoration-amber-600/50 dark:decoration-amber-400/50 hover:decoration-amber-700 dark:hover:decoration-amber-300 text-amber-950 dark:text-amber-200 font-semibold hover:text-amber-700 dark:hover:text-white transition-colors"
                                >
                                    Discord
                                </a>{' '}
                                if you see a foul ad.
                            </p>
                            <p>
                                Don&apos;t be tricked: only download if clicking the button takes you directly to{' '}
                                <strong className="text-amber-950 dark:text-amber-100 font-semibold">
                                    {capitalizeFirstLetter(appName)}
                                </strong>{' '}
                                host.
                            </p>
                            <p className="text-amber-800/90 dark:text-amber-400/80 text-xs font-medium dark:font-normal">
                                Tip: Match the downloaded file size with the size specified on the main game page if possible.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className=" border border-accent/90 rounded-2xl p-5 md:p-6 shadow-xl hover:border-accent/80 transition-colors flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <HelpCircle className="w-4 h-4 text-primary" />
                                <h3 className="font-bold  text-base">Having trouble?</h3>
                            </div>

                            <div className="space-y-2">
                                {troubleGuides.map((guide) => (
                                    <div
                                        key={guide.id}
                                        className=" rounded-xl overflow-hidden /40"
                                    >
                                        <button
                                            onClick={() => {}}
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-accent/90 hover:bg-accent hover:border-accent font-medium text-xs transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
                                        >
                                            <div className="flex items-center gap-2.5 min-w-0">
                                                {guide.icon}
                                                <span className="text-xs font-medium truncate">{guide.title}</span>
                                            </div>
                                            <ChevronDown className={`w-3.5 h-3.5 text-accent shrink-0 transition-transform duration-200`} />
                                        </button>

                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-accent text-[11px] text-neutral-500 flex items-center justify-between">
                            <span>Need extract password? Check game page</span>
                            <ExternalLink className="w-3 h-3 text-neutral-600" />
                        </div>
                    </motion.div>

                    {/* Card 2: Link not working? */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className=" border border-accent/90 rounded-2xl p-5 md:p-6 shadow-xl hover:border-accent0/80 transition-colors flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <AlertTriangle className="w-4 h-4 text-rose-400" />
                                <h3 className="font-bold  text-base">Link not working?</h3>
                            </div>

                            <p className="text-xs leading-relaxed mb-5">
                                Dead link, wrong file version, or no download button after the wait? Report it to us and our site moderators will fix it as soon as possible.
                            </p>

                            <div className="space-y-2.5">
                                <button
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-accent/70 hover:bg-accent hover:border-accent font-medium text-xs transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
                                >
                                    <Flag className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform" />
                                    <span>Report on the game page</span>
                                </button>

                                <button
                                    className="w-full px-3.5 py-2.5 rounded-xl  border border-indigo-700/40 hover:bg-indigo-900/50 hover:border-indigo-600  font-medium text-xs transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
                                >
                                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                                    <span>Ask us on Discord</span>
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-accent/60 text-[11px] text-neutral-500">
                            The report opens the specific mirror issue queue. Discord gives faster response.
                        </div>
                    </motion.div>

                </div>

            </main>

        </div>
    );
}