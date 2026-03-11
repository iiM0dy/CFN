import Image from "next/image"

export function CFNLogo({ className = "size-8" }: { className?: string }) {
    return (
        <div className={className}>
            <Image
                src="/assets/cfn_no_background.png"
                alt="CFNboost logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
                priority
            />
        </div>
    )
}
