import logo from '../../assets/FINEXA_logo.jpg';

export const Logo = () => {
    return (
        <div className="flex items-center gap-2 group cursor-pointer">
            <img src={logo} alt="Finexa" className="h-10 w-auto rounded-full object-cover border-2 border-transparent transition-all" />
            <span className="text-xl font-bold tracking-tight group-hover:underline underline-offset-4">FINEXA</span>
        </div>
    );
};
