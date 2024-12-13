import Delete from '../../assets/delete.png';

interface HistoryProps {
    data: string[] | null;
    isCopy: string | false;
    handleCopy: (txt: string) => void;
    handleDelete: (txt: string) => void;
  }
  
  export function History  ({ data, isCopy, handleCopy, handleDelete }: HistoryProps) { 
  return (
    <div className='w-full mt-10 flex flex-col gap-5 shadow-md items-center justify-center'>
      {data && data.length > 0 && (
        <>
          <p className='text-white font-semibold text-lg sm:text-xl text-center'>Histórico de Resumos</p>
          {data.map((d, index) => (
            <div key={index} className='w-full max-w-xs sm:max-w-xl bg-slate-900 p-3 rounded-md'>
              <p className='text-gray-400 text-sm sm:text-lg'>{d}</p>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-5 items-center justify-end mt-2'>
                <p
                  className='text-gray-200 font-semibold cursor-pointer text-sm sm:text-base'
                  onClick={() => handleCopy(d)}
                >
                  {isCopy === 'true' ? 'Copiado' : 'Copiar'}
                </p>
                <span className='cursor-pointer' onClick={() => handleDelete(d)}>
                  <img src={Delete} className='w-5 h-5 sm:w-6 sm:h-6' />
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}