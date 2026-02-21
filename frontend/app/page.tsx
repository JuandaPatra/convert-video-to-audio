import Image from "next/image";

export default function Home() {
  return (
        <main className="min-h-screen flex flex-col items-center py-8 px-4 relative max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="text-center mb-8 space-y-2">
        
        <Image src="/logo_jkt48.webp" alt="Logo" width={300} height={300} className="mx-auto" />
        <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto">
          Pilih member favoritmu dan lihat takdir profesi apa yang cocok untuknya!
        </p>
      </header>

      {/* Grid */}
      {/* <MemberGrid
        members={members}
        selectedMemberId={selectedMember?.id || null}
        onSelect={handleSelectMember}
        disabled={isScanning || !!result}
      /> */}

      {/* Floating Action Bar (Sticky on Mobile) */}
      {/* <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex justify-center z-40 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md">
          <Button
            onClick={handleStart}
            disabled={!selectedMember || isScanning || !!result}
            fullWidth
            className="shadow-2xl shadow-red-900/20 text-lg py-4"
          >
            {selectedMember ? `Tentukan Nasib ${capitalize(selectedMember.id)} 🔮` : "Pilih Member Dulu 👆"}
          </Button>
        </div>
      </div> */}

      {/* Overlays */}
      {/* {isScanning && selectedMember && (
        <ScanningOverlay member={selectedMember} />
      )} */}

      {/* {result && (
        <ResultModal
          result={result}
          onTryAgain={handleTryAgain}
          onChangeMember={handleChangeMember}
        />
      )} */}
      
      {/* Footer Credit */}
      <footer className="mt-8 mb-24 md:mb-8 text-center text-xs text-gray-600">
        <p>Made for JKT48 Fans • Not affiliated with JKT48 Operation Team</p>
      </footer>
    </main>
  );
}
