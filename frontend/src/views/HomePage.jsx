import LinkForm from "../components/LinkForm";
import LinkShowCase from "../components/LinkShowCase";

export default function HomePage() {
  return (
    <section className="container mx-auto px-4 sm:px-0">
      <div className="flex gap-8">
        <div className="flex-none w-[30vw] bg-white rounded-lg">
          <LinkShowCase />
        </div>
        <div className="flex-initial w-full bg-white rounded-lg">
          <LinkForm />
        </div>
      </div>
    </section>
  );
}
