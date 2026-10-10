import { DotTag } from '@webf/sprinkles';

export default function Example() {
  return (
    <div class='w-full'>
      <div class='flex flex-wrap gap-3'>
        <DotTag
          class='!border-emerald-400 !bg-emerald-50 !text-emerald-900'
          label='Approved'
        />
        <DotTag
          class='!border-rose-300 !bg-rose-50 !text-rose-900'
          label='Needs review'
        />
        <DotTag
          class='!border-blue-300 !bg-blue-50 !text-blue-900'
          label='Information'
        />
      </div>
    </div>
  );
}
