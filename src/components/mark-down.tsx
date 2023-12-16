import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark as dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type MarkdownComponentProps = {
  content: string;
};

function MarkdownComponent({ content }: MarkdownComponentProps) {
  return (
    <Markdown
      // components={{
      //   h1: ({ node, ...props }) => (
      //     <h1
      //       className="mb-2 scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl"
      //       {...props}
      //     />
      //   ),
      //   h2: ({ node, ...props }) => (
      //     <h2
      //       className="mt-2 scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0"
      //       {...props}
      //     />
      //   ),
      //   h3: ({ node, ...props }) => (
      //     <h3
      //       className="scroll-m-20 text-lg font-semibold tracking-tight"
      //       {...props}
      //     />
      //   ),
      //   h4: ({ node, ...props }) => (
      //     <h4
      //       className="scroll-m-20 text-xl font-semibold tracking-tight"
      //       {...props}
      //     />
      //   ),
      //   code: ({ node, ...props }) => (
      //     <code
      //       className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      //       {...props}
      //     />
      //   ),
      //   p: ({ node, ...props }) => (
      //     <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />
      //   ),
      //   ul: ({ node, ...props }) => (
      //     <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
      //   ),
      //   a: ({ node, ...props }) => (
      //     <a className="text-blue-500 hover:underline" {...props} />
      //   ),
      // }}

      // * Fancy Code Block
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className ?? '');
          return match ? (
            // @ts-expect-error - Maybe Wrong types
            <SyntaxHighlighter
              {...rest}
              wrapLines={true}
              wrapLongLines={true}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={dark}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
    >
      {content}
    </Markdown>
  );
}

export default MarkdownComponent;
