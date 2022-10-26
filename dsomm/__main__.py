import click

from . import generate_excel


@click.command()
@click.option(
    "--outfile",
    default="tests/out/dsomm-questionnaire.xlsx",
    help="Output file",
    type=click.Path(exists=False),
)
@click.option(
    "--infile",
    default="tests/out/dsomm-questionnaire.xlsx",
    help="Answers file",
    type=click.Path(exists=True),
)
def main(outfile, infile):
    generate_excel(outfile=outfile, infile=infile)


if __name__ == "__main__":
    main()
