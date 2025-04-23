"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LiveTranscription() {
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await fetch('/api/live-transcriptions');
        const data = await response.json();
        
        if (data.transcripts) {
          setTranscripts(prev => {
            // Keep only the last 10 transcripts to prevent overflow
            const newTranscripts = [...prev, ...data.transcripts];
            return newTranscripts.slice(-10);
          });
        }
      } catch (error) {
        console.error('Error fetching live transcriptions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTranscripts();
    const interval = setInterval(fetchTranscripts, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-6 text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                Live Transcription
              </h1>
              <p className="text-purple-200 mt-1">Real-time speech-to-text conversion</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
              <span className="text-sm">{loading ? 'Connecting...' : 'Live'}</span>
            </div>
          </div>
        </motion.header>

        {/* Transcription Container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-black bg-opacity-30 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-purple-500 border-opacity-30"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-purple-200">Initializing transcription service...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transcripts.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-cyan-300">Recent Transcripts</h2>
                    <span className="text-xs bg-purple-700 px-2 py-1 rounded-full">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
                    
                  <button
  onClick={() => {
    const blob = new Blob([transcripts.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transcript_${new Date().toISOString()}.txt`;
    link.click();
  }}
  className="bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold px-4 py-2 rounded shadow transition"
>
  Export Transcript
</button>

                    <AnimatePresence>
                      {transcripts.map((transcript, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 rounded-lg border-l-4 border-cyan-400 shadow-md"
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center mr-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <p className="text-white leading-relaxed">{transcript}</p>
                          </div>
                          <div className="text-right mt-2">
                            <span className="text-xs text-purple-300">
                              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  <p className="mt-4 text-purple-200 text-center">
                    Waiting for audio input... <br />
                    Speak clearly to see transcriptions appear here.
                  </p>
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-purple-300 text-sm"
        >
          <p>Transcription updates every 5 seconds • Powered by Next.js</p>
        </motion.footer>
      </div>
    </div>
  );
}